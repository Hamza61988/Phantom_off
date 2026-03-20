package com.example.phantomoff

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.Context
import android.content.Intent
import android.provider.Settings

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.phantomoff/stealth"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "toggleStealthMode" -> {
                    val enabled = call.argument<Boolean>("enabled") ?: false
                    val prefs = getSharedPreferences("PhantomOffPrefs", Context.MODE_PRIVATE)
                    prefs.edit().putBoolean("stealth_mode_enabled", enabled).apply()
                    result.success(null)
                }
                "isStealthModeActive" -> {
                    val prefs = getSharedPreferences("PhantomOffPrefs", Context.MODE_PRIVATE)
                    result.success(prefs.getBoolean("stealth_mode_enabled", false))
                }
                "requestAccessibility" -> {
                    val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
                    startActivity(intent)
                    result.success(null)
                }
                "requestAudioSettings" -> {
                    // Just a placeholder for permission logic
                    result.success(null)
                }
                else -> {
                    result.notImplemented()
                }
            }
        }
    }
}
