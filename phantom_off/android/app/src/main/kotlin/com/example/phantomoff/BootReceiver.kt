package com.example.phantomoff

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            val prefs = context.getSharedPreferences("PhantomOffPrefs", Context.MODE_PRIVATE)
            val isEnabled = prefs.getBoolean("stealth_mode_enabled", false)
            
            if (isEnabled) {
                // Restart the service or accessibility service is handled by system
                // but we might want to start our foreground service if it was running
                val serviceIntent = Intent(context, StealthForegroundService::class.java)
                context.startForegroundService(serviceIntent)
            }
        }
    }
}
