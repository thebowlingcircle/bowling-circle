# Instructions for Claude Code on this repo

## Updating project context
Whenever the user says "update context" or "MD" (in any message, any session), regenerate `CONTEXT.md` at the repo root from scratch, based on:
- The current state of the codebase (files, routes, schema, dependencies)
- `git log` (recent commit history and messages)
- Whatever the user tells you has changed in that conversation

Preserve CONTEXT.md's overall structure and section headers unless something has been genuinely removed from the project. Always update the "Last updated" line at the top of CONTEXT.md with the current date. Do not silently drop the "Known gotchas" or "Open items" sections — only remove an item from either if the user confirms it's resolved. After regenerating, show the user the new content and do not commit or push until they review it.

## Standing conventions for this project
- Claude Code prompts/tasks on this repo should be narrowly scoped: exact files, exact changes, explicit "do not touch anything else."
- Run `npm run build` and confirm no errors before considering any change done.
- Do NOT commit or push code changes until the user has explicitly reviewed the file list and confirmed — this applies to every change, no exceptions, unless the user's instruction in that session explicitly says otherwise.
- After any schema change (anything touching `server/db/schema.sql`), always state the exact SQL the user needs to run manually in the Neon SQL Editor against the live database, separate from and in addition to the code change. A schema file change alone does NOT apply to the live database — this has caused a production incident before (see CONTEXT.md "Known gotchas").
