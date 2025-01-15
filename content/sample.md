# Sample Network Logs for Exercises

## Network Performance Log Sample
```
2024-01-15 09:23:14 UTC [ALERT] High latency detected on node-cluster-03
2024-01-15 09:23:15 UTC [INFO] Current latency: 180ms (threshold: 100ms)
2024-01-15 09:23:16 UTC [METRIC] Bandwidth utilization: 87%
2024-01-15 09:23:16 UTC [METRIC] Packet loss rate: 2.3%
2024-01-15 09:23:17 UTC [INFO] Active connections: 1,520
2024-01-15 09:23:18 UTC [WARN] Buffer overflow risk on interface eth0
2024-01-15 09:23:19 UTC [METRIC] CPU usage: 92%
2024-01-15 09:23:20 UTC [METRIC] Memory usage: 86%
2024-01-15 09:23:21 UTC [ERROR] Connection timeout on backup link
2024-01-15 09:23:22 UTC [INFO] Failover initiated to secondary path
```

## Network Configuration Snapshot
```
interface GigabitEthernet0/1
 description Primary Uplink
 ip address 192.168.1.1 255.255.255.0
 duplex auto
 speed auto
 no shutdown
!
interface GigabitEthernet0/2
 description Backup Link
 ip address 192.168.2.1 255.255.255.0
 duplex auto
 speed auto
 shutdown
!
router bgp 65000
 neighbor 192.168.1.2 remote-as 65001
 neighbor 192.168.2.2 remote-as 65001
!
ip route 0.0.0.0 0.0.0.0 192.168.1.2
ip route 0.0.0.0 0.0.0.0 192.168.2.2 10
```

## Customer Support Ticket Log
```
Ticket ID: INC-2024-0115-001
Priority: High
Status: Open
Customer: Enterprise Client XYZ
Service Impact: Voice Quality Issues

Description:
Customer reports intermittent voice quality issues affecting 50+ users at their main office location. Issues started approximately 2 hours ago. Users experiencing static, echo, and occasional call drops.

Technical Details:
- VoIP Service Plan: Enterprise Voice Premium
- Connection Type: Dedicated Fiber
- Current Bandwidth: 1Gbps
- QoS Settings: Enabled
- Recent Changes: Network upgrade performed last week

Previous Actions:
- Basic connectivity test performed: Passed
- Packet loss test result: 1.2%
- Jitter test result: 12ms
```

## System Alert Log
```
[Critical] 2024-01-15 09:45:00 - Cell Site ID: CS-2024-15A
Multiple Service Affecting Alarms:
- Power System Warning (Battery Backup Active)
- High Temperature Alert (42°C)
- Backhaul Link Degradation
- Coverage Impact: Estimated 1,200 users affected
- Location: Industrial District, Block 3
- Weather Conditions: Heavy Rain

Active Monitoring Stats:
- Signal Strength: -95 dBm (Below threshold)
- BER: 2.1E-3
- Frame Error Rate: 1.8%
- Channel Utilization: 89%
```
