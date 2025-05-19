# ECOZAR: Digital Tour Guide System for an E-Shuttle

## Overview
ECOZAR is a standalone digital tour guide application tailored for a solar-charged e-shuttle operating within a campus environment. It delivers real-time location tracking, synchronized voice narration, and slideshow presentations, engaging passengers with automated tours of landmarks and points of interest.

## Key Features

- **Dual-Screen Support**: 7″ touch screen for driver controls (Tour/Normal modes) and 22″ passenger monitor for maps, slides, and narration.  
- **Geofence-Triggered Narration**: Automated voice narratives and slideshow triggers based on GPS-defined geofences.  
- **Offline Resilience**: Local map caching and fallback for GPS signal loss or internet outages.  
- **Battery & Solar Monitoring**: Integrates ESP32-based sensors, delivering real-time data on state of charge, solar output, and efficiency.  
- **Scalable Architecture**: Modular codebase using Electron + Vite + React, enabling addition of new routes or shuttles.  
- **Automatic Boot**: Launches directly into the application on power-up, bypassing OS elements for seamless deployment.

## System Architecture

┌──────────────────────────────┐       ┌───────────────────────────┐
│       Beelink S12 Mini PC    │       │       ESP32 Module        │
│ (Electron Main + React UI)   │◀────▶│ (ADS1115, ACS758, DS18B20)│
│                              │ Serial│                           │
└──────────────────────────────┘       └───────────────────────────┘
                  │
                  ▼
       ┌──────────────────────────┐
       │  VK-162 USB GPS Receiver │
       └──────────────────────────┘
Electron Main Process: Manages IPC, serial comms (GPS, sensor data), logging, and window management.

React Renderer: Renders UI for driver/passenger, including map, controls, and multimedia content.

Preload Script: Exposes safe IPC channels (contextBridge) for data flow between processes.

## Technologies & Dependencies

Frameworks: Electron, Vite, React (JavaScript)

Styling: Tailwind CSS

State Management: React Context API

Hardware Interfaces: Serialport, Node-GPS parsing, OneWire (DS18B20), ADS1115 ADC, ACS758 sensors

Voice Synth: ElevenLabs

Mapping: MapLibreGL

## Usage

Connect Hardware: Attach GPS and ESP32 modules via USB.

Select Mode: On the driver’s panel, choose Tour Mode to activate narration or Normal Mode for standard driving.

Monitor Dashboard: View live sensor metrics (SOC, solar efficiency) and route map on passenger screen.

Review Logs: Hourly logs in logs/hourly/ and daily summaries in logs/daily/.
