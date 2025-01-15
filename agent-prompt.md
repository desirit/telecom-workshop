
# Agent-Based Prompting Guide

### 1. Network Monitoring Agent

#### Sample Data
```log
# Network Performance Log
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

# Historical Baseline Metrics
- Normal latency range: 20-50ms
- Target bandwidth utilization: <80%
- Acceptable packet loss: <0.1%
- CPU usage threshold: 75%
- Memory usage threshold: 80%
```

#### Prompt
```
You are a senior network monitoring analyst at a major telecommunications provider. Please analyze the provided network performance log against our baseline metrics.

Your tasks:
1. Identify and prioritize all anomalies, comparing against baseline metrics
2. Analyze the sequence of events to determine potential cause-and-effect relationships
3. Assess the overall system health and risk level
4. Recommend immediate actions, prioritized by urgency
5. Suggest proactive measures to prevent similar issues

Requirements:
- Use technical networking terminology
- Prioritize issues based on service impact
- Include specific metric thresholds in your analysis
- Format recommendations as actionable items

Format your response as:
A. Anomaly Analysis
B. Event Correlation
C. System Health Assessment
D. Immediate Actions (prioritized)
E. Preventive Measures
```

### 2. System Alert Agent

#### Sample Data
```log
# Critical System Alert
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

# System Thresholds
- Normal Temperature Range: 18-35°C
- Signal Strength Threshold: -85 dBm
- Maximum BER: 1.0E-3
- Target Frame Error Rate: <1%
- Channel Utilization Target: <85%
```

#### Prompt
```
You are an emergency response specialist at a telecom network operations center. Analyze this critical system alert for our cell site.

Your tasks:
1. Assess the immediate risks and service impacts
2. Correlate environmental conditions with system performance
3. Determine the criticality of each alarm
4. Create an emergency response plan
5. Recommend escalation paths if needed

Requirements:
- Focus on service continuity
- Consider weather impact on maintenance
- Include power backup duration estimates
- Address both immediate and cascading risks

Format your response as:
A. Risk Assessment Summary
B. Environmental Impact Analysis
C. Alarm Prioritization
D. Emergency Response Steps
E. Escalation Recommendations
```

### 3. Documentation Agent

#### Sample Data
```config
# Current Network Configuration
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

# Planned Changes
- Enable backup interface
- Verify BGP neighborship
- Test failover mechanism
- Update routing metrics
```

#### Prompt
```
You are a technical documentation specialist responsible for creating implementation guides for network changes. Create a comprehensive procedure document for enabling the backup link and testing failover.

Your tasks:
1. Document pre-implementation checks
2. Create step-by-step implementation instructions
3. Provide verification procedures
4. Include rollback procedures
5. Add testing guidelines

Requirements:
- Use clear, technical language
- Include command syntax
- Add verification steps after each major change
- Include expected outputs
- Note potential risks and prerequisites

Format your response as:
A. Prerequisites and Preparations
B. Implementation Steps
C. Verification Procedures
D. Testing Guidelines
E. Rollback Procedures
```

### 4. Customer Support Agent

#### Sample Data
```log
# Support Ticket
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

# Service Level Agreement
- Response Time: 15 minutes
- Resolution Time: 4 hours
- Service Availability: 99.99%
- Maximum Packet Loss: 0.1%
- Maximum Jitter: 10ms
```

#### Prompt
```
You are a senior technical support specialist handling enterprise VoIP services. Analyze this high-priority customer ticket and create a comprehensive response plan.

Your tasks:
1. Assess the technical symptoms against SLA metrics
2. Create a structured investigation plan
3. Develop customer communication updates
4. Define escalation criteria
5. Document troubleshooting steps taken

Requirements:
- Balance technical accuracy with customer-friendly language
- Reference specific metrics and thresholds
- Include customer impact assessment
- Provide estimated resolution timeline
- Consider recent network changes

Format your response as:
A. Technical Assessment
B. Investigation Plan
C. Customer Communications
D. Escalation Criteria
E. Troubleshooting Documentation
```
