---
description: Initial Scale-First Workflow
---

# /init-van-stack

**Description:** Bootstraps the Java backend and AI infrastructure for a single van, prepared for 100-van scaling.

## Steps:
1. **Directory Check**: Verify `/backend-core` and `/ai-agents` folders exist.
2. **Backend Scaffolding**: 
   - Initialize a Spring Boot 3.4 project with Java 21 in `/backend-core`.
   - Add dependencies: `Spring Web`, `Spring Data JPA`, `Lombok`, and `PostgreSQL Driver`.
3. **Database Setup**:
   - Connect via Antigravity MCP to local PostgreSQL.
   - Run the initial migration for `Fleets`, `Vans`, and `Trips` tables using UUIDs.
4. **Agent Link**:
   - Load the "Financial Marking Agent" config into the Agent Manager.
5. **Confirmation**:
   - Confirm setup is complete by displaying a "Scale Readiness" report.
