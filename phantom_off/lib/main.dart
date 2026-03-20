import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(const PhantomOffApp());
}

class PhantomOffApp extends StatelessWidget {
  const PhantomOffApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PhantomOff',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.red,
        useMaterial3: true,
      ),
      home: const SettingsScreen(),
    );
  }
}

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  static const platform = MethodChannel('com.example.phantomoff/stealth');
  bool _isStealthModeOn = false;
  String _combo = "Volume Down x3, Volume Up x2";

  @override
  void initState() {
    super.initState();
    _checkStatus();
  }

  Future<void> _checkStatus() async {
    try {
      final bool result = await platform.invokeMethod('isStealthModeActive');
      setState(() {
        _isStealthModeOn = result;
      });
    } on PlatformException catch (e) {
      debugPrint("Failed to get status: '${e.message}'.");
    }
  }

  Future<void> _toggleStealthMode(bool value) async {
    try {
      await platform.invokeMethod('toggleStealthMode', {"enabled": value});
      setState(() {
        _isStealthModeOn = value;
      });
    } on PlatformException catch (e) {
      debugPrint("Failed to toggle: '${e.message}'.");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('PhantomOff Settings'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          Card(
            child: SwitchListTile(
              title: const Text('Stealth Mode'),
              subtitle: Text(_isStealthModeOn ? 'Active - Intercepting Power Button' : 'Inactive'),
              value: _isStealthModeOn,
              onChanged: _toggleStealthMode,
              secondary: Icon(
                _isStealthModeOn ? Icons.security : Icons.security_outlined,
                color: _isStealthModeOn ? Colors.green : Colors.grey,
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Unlock Configuration',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          ListTile(
            title: const Text('Secret Combo'),
            subtitle: Text(_combo),
            trailing: const Icon(Icons.edit),
            onTap: () {
              // Implementation for changing combo
            },
          ),
          const Divider(),
          const Text(
            'Permissions',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          ListTile(
            leading: const Icon(Icons.accessibility),
            title: const Text('Accessibility Service'),
            subtitle: const Text('Required to intercept power button'),
            trailing: const Icon(Icons.check_circle, color: Colors.green),
            onTap: () => platform.invokeMethod('requestAccessibility'),
          ),
          ListTile(
            leading: const Icon(Icons.volume_up),
            title: const Text('Audio Settings'),
            subtitle: const Text('Required to silence phone'),
            onTap: () => platform.invokeMethod('requestAudioSettings'),
          ),
        ],
      ),
    );
  }
}
