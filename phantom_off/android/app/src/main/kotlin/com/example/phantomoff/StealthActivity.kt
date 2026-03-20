package com.example.phantomoff

import android.content.Context
import android.media.AudioManager
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import android.provider.Settings
import android.util.Log

class StealthActivity : AppCompatActivity() {

    private lateinit var audioManager: AudioManager
    private var originalBrightness: Int = 125
    private var originalVolume: Int = 7
    
    private var comboStep = 0
    private var lastKeyTime: Long = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Full screen black
        setContentView(View(this).apply { setBackgroundColor(0xFF000000.toInt()) })
        
        // Hide UI
        window.addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS)
        window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN)

        // Dim screen to minimum
        val lp = window.attributes
        lp.screenBrightness = 0.01f
        window.attributes = lp

        audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        
        // Silence phone
        silencePhone()
        
        // Start Foreground Service to keep alive
        val serviceIntent = android.content.Intent(this, StealthForegroundService::class.java)
        startService(serviceIntent)
    }

    private fun silencePhone() {
        audioManager.ringerMode = AudioManager.RINGER_MODE_SILENT
        audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, 0, 0)
        audioManager.setStreamVolume(AudioManager.STREAM_RING, 0, 0)
        audioManager.setStreamVolume(AudioManager.STREAM_NOTIFICATION, 0, 0)
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        val currentTime = System.currentTimeMillis()
        if (currentTime - lastKeyTime > 5000) {
            comboStep = 0
        }
        lastKeyTime = currentTime

        // Combo: Vol Down x3, Vol Up x2
        when (keyCode) {
            KeyEvent.KEYCODE_VOLUME_DOWN -> {
                if (comboStep < 3) {
                    comboStep++
                } else {
                    comboStep = 1
                }
            }
            KeyEvent.KEYCODE_VOLUME_UP -> {
                if (comboStep >= 3 && comboStep < 5) {
                    comboStep++
                    if (comboStep == 5) {
                        exitStealthMode()
                    }
                } else {
                    comboStep = 0
                }
            }
            else -> comboStep = 0
        }
        
        return true // Intercept all keys
    }

    private fun exitStealthMode() {
        // Restore settings
        audioManager.ringerMode = AudioManager.RINGER_MODE_NORMAL
        
        val serviceIntent = android.content.Intent(this, StealthForegroundService::class.java)
        stopService(serviceIntent)
        
        finish()
    }

    override fun onBackPressed() {
        // Do nothing
    }
}
