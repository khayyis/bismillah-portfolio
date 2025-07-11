'use client';

import React, { useState, useEffect } from 'react';
import './DeviceInfo.css';

/**
 * DeviceInfo Component
 * 
 * Displays information about the user's device and connection
 * that is used for performance optimizations.
 */
const DeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    connection: 'Unknown',
    cpuCores: 'Unknown',
    memory: 'Unknown',
    deviceType: 'Unknown',
    reducedMotion: 'Unknown',
    batteryStatus: 'Unknown',
    batteryLevel: 'Unknown',
  });

  useEffect(() => {
    // Get connection information
    const getConnectionInfo = () => {
      const connection = navigator.connection || 
                        navigator.mozConnection || 
                        navigator.webkitConnection;
      
      if (connection) {
        return {
          effectiveType: connection.effectiveType || 'Unknown',
          downlink: connection.downlink ? `${connection.downlink} Mbps` : 'Unknown',
          rtt: connection.rtt ? `${connection.rtt} ms` : 'Unknown',
          saveData: connection.saveData ? 'Yes' : 'No',
        };
      }
      
      return {
        effectiveType: 'Unknown',
        downlink: 'Unknown',
        rtt: 'Unknown',
        saveData: 'Unknown',
      };
    };

    // Get CPU cores
    const getCPUCores = () => {
      return navigator.hardwareConcurrency || 'Unknown';
    };

    // Get device memory
    const getDeviceMemory = () => {
      return navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown';
    };

    // Get device type
    const getDeviceType = () => {
      const userAgent = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'Mobile';
      }
      return 'Desktop';
    };

    // Check if reduced motion is preferred
    const getReducedMotion = () => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Yes' : 'No';
    };

    // Get battery status
    const getBatteryInfo = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          return {
            status: battery.charging ? 'Charging' : 'Discharging',
            level: `${Math.floor(battery.level * 100)}%`,
          };
        } catch (error) {
          console.error('Error getting battery info:', error);
        }
      }
      
      return {
        status: 'Unknown',
        level: 'Unknown',
      };
    };

    // Collect all device information
    const collectDeviceInfo = async () => {
      const connectionInfo = getConnectionInfo();
      const batteryInfo = await getBatteryInfo();
      
      setDeviceInfo({
        connection: `${connectionInfo.effectiveType} (${connectionInfo.downlink}, ${connectionInfo.rtt})`,
        cpuCores: getCPUCores(),
        memory: getDeviceMemory(),
        deviceType: getDeviceType(),
        reducedMotion: getReducedMotion(),
        saveData: connectionInfo.saveData,
        batteryStatus: batteryInfo.status,
        batteryLevel: batteryInfo.level,
      });
    };

    // Initial collection
    collectDeviceInfo();

    // Update on connection change if available
    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', collectDeviceInfo);
    }

    // Update on reduced motion preference change
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addEventListener('change', collectDeviceInfo);

    // Cleanup
    return () => {
      if (connection) {
        connection.removeEventListener('change', collectDeviceInfo);
      }
      reducedMotionQuery.removeEventListener('change', collectDeviceInfo);
    };
  }, []);

  return (
    <div className="device-info-container bg-gray-800 rounded-lg p-6 mt-8 max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-white mb-4">Device Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="info-item">
          <div className="text-gray-400 text-sm">Connection</div>
          <div className="text-white">{deviceInfo.connection}</div>
        </div>
        
        <div className="info-item">
          <div className="text-gray-400 text-sm">CPU Cores</div>
          <div className="text-white">{deviceInfo.cpuCores}</div>
        </div>
        
        <div className="info-item">
          <div className="text-gray-400 text-sm">Memory</div>
          <div className="text-white">{deviceInfo.memory}</div>
        </div>
        
        <div className="info-item">
          <div className="text-gray-400 text-sm">Device Type</div>
          <div className="text-white">{deviceInfo.deviceType}</div>
        </div>
        
        <div className="info-item">
          <div className="text-gray-400 text-sm">Reduced Motion</div>
          <div className="text-white">{deviceInfo.reducedMotion}</div>
        </div>
        
        <div className="info-item">
          <div className="text-gray-400 text-sm">Save Data</div>
          <div className="text-white">{deviceInfo.saveData}</div>
        </div>
        
        <div className="info-item">
          <div className="text-gray-400 text-sm">Battery Status</div>
          <div className="text-white">{deviceInfo.batteryStatus}</div>
        </div>
        
        <div className="info-item">
          <div className="text-gray-400 text-sm">Battery Level</div>
          <div className="text-white">{deviceInfo.batteryLevel}</div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        <p>These values are used to optimize the ProfileCard component for your device.</p>
      </div>
    </div>
  );
};

export default DeviceInfo;