package com.example.phantomoff

import android.os.Bundle
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import android.content.Intent
import android.widget.LinearLayout

class FakePowerOffActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Make it look like a dialog
        setContentView(R.layout.activity_fake_power_off)
        
        window.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT)
        window.setBackgroundDrawableResource(android.R.color.transparent)

        findViewById<View>(R.id.btn_power_off).setOnClickListener {
            startStealthMode()
        }

        findViewById<View>(R.id.btn_restart).setOnClickListener {
            // Simulate restart or just close
            finish()
        }
        
        findViewById<View>(R.id.root_view).setOnClickListener {
            finish()
        }
    }

    private fun startStealthMode() {
        val intent = Intent(this, StealthActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
        startActivity(intent)
        finish()
    }
}
