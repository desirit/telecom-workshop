# Prompt Engineering Examples for Telecom

## 1. Single-Shot Prompting Examples

### Basic Network Analysis
```
Analyze the following network log and identify:
1. The primary issue
2. Potential root causes
3. Recommended immediate actions

Use technical language appropriate for network engineers.

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

### Configuration Review
```
Review this network configuration and:
1. Identify any security vulnerabilities
2. Suggest optimization opportunities
3. List potential redundancy improvements

Format your response as bullet points under each category.

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

## 2. Chain Prompting Examples

### Customer Support Analysis Chain

#### Step 1: Issue Classification
```
Analyze this customer support ticket and classify the issue:
1. Service type affected
2. Severity level (High/Medium/Low)
3. Technical domain (Network/Voice/Hardware)
4. Potential impact scope

Format as a concise list.

Ticket ID: INC-2024-0115-001
Priority: High
Status: Open
Customer: Enterprise Client XYZ
Service Impact: Voice Quality Issues

Description:
Customer reports intermittent voice quality issues affecting 50+ users at their main office location. Issues started approximately 2 hours ago. Users experiencing static, echo, and occasional call drops.

```

#### Step 2: Technical Analysis
```
Based on the classified issue, analyze the technical details provided:
1. List all relevant technical metrics
2. Compare metrics against standard thresholds
3. Identify any missing critical information
4. Flag any unusual patterns

Technical Details:
- VoIP Service Plan: Enterprise Voice Premium
- Connection Type: Dedicated Fiber
- Current Bandwidth: 1Gbps
- QoS Settings: Enabled
- Recent Changes: Network upgrade performed last week
```

#### Step 3: Solution Generation
```
Using the technical analysis, provide:
1. Immediate mitigation steps
2. Root cause investigation plan
3. Long-term resolution recommendations
4. Customer communication points

Structure your response as an action plan with timeframes.
```

## 3. Emotion-Aware Prompting Examples

### Technical with Empathy
```
Generate a customer response for this technical issue that:
1. Shows understanding of their business impact
2. Explains the technical issue in clear terms
3. Provides concrete next steps
4. Maintains a professional yet empathetic tone

Context: Enterprise customer with voice quality issues affecting their operations.

Ticket ID: INC-2024-0115-001
Priority: High
Status: Open
Customer: Enterprise Client XYZ
Service Impact: Voice Quality Issues

Description:
Customer reports intermittent voice quality issues affecting 50+ users at their main office location. Issues started approximately 2 hours ago. Users experiencing static, echo, and occasional call drops.

```

### Escalation Communication
```
Create an escalation update that:
1. Acknowledges the service impact
2. Explains technical progress professionally
3. Provides clear timeline expectations
4. Demonstrates proactive handling

Remember to maintain confidence while showing appropriate concern.

Current situation: 
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

## 4. Exercise Templates

### Exercise 1: Network Diagnostics
```
You are a senior network engineer. Using this log data:
1. What are the primary and secondary issues?
2. What correlation exists between the metrics?
3. What immediate actions would you recommend?
4. Draft a technical escalation if needed

[Insert Network Log]
```

### Exercise 2: Customer Communication
```
You are handling an enterprise customer escalation. Create:
1. An immediate acknowledgment response
2. A technical investigation update
3. A resolution communication

Each response should balance technical accuracy with customer empathy.

[Insert Ticket Details]
```

### Exercise 3: Documentation Generation
```
Create a technical knowledge base article that:
1. Describes the network issue
2. Lists troubleshooting steps
3. Provides resolution procedures
4. Includes preventive measures

Format for technical audience while maintaining clarity.

[Insert Technical Details]
```
