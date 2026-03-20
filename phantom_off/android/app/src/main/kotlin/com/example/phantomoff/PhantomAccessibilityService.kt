package com.example.phantomoff

import android.accessibilityservice.AccessibilityService
import android.view.KeyEvent
import android.view.accessibility.AccessibilityEvent
import android.content.Intent
import android.util.Log

class PhantomAccessibilityService : AccessibilityService() {

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // We can listen for the system power dialog window appearing
        if (event?.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val className = event.className?.toString() ?: ""
            if (className.contains("GlobalActionsDialog") || className.contains("PowerOptions")) {
                if (isStealthModeEnabled()) {
                    // Close the system dialog by performing the back action
                    performGlobalAction(GLOBAL_ACTION_BACK)
                    
                    // Launch our fake power menu
                    val intent = Intent(this, FakePowerOffActivity::class.java)
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    startActivity(intent)
                }
            }
        }
    }

    override fun onInterrupt() {}

    private fun isStealthModeEnabled(): Boolean {
        val prefs = getSharedPreferences("PhantomOffPrefs", MODE_PRIVATE)
        return prefs.getBoolean("stealth_mode_enabled", false)
    }

    override fun onKeyEvent(event: KeyEvent?): Boolean {
        // Optional: Some devices allow intercepting keys here
        return super.onKeyEvent(event)
    }
}
