## Code quality

No `sonar-project.properties` in this repo (no local SonarQube config) — if CI runs SonarQube/SonarCloud analysis on this project, treat new blocker/critical issues on changed lines as build-breaking and fix them before considering a change done.
always follow sonarqube code standed

## Avoid
- No `any` type, use `unknown` and narrow instead
- No default exports
- No unnecessary comments, only comment where the code isn't self-explanatory
- No single-line comments, always use multiline comment blocks