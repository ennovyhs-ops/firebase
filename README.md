# Firebase Studio

This is a NextJS starter in Firebase Studio.
# firebase

A web-based application for sport coach to communicate and manage player. 


## Features

- **User Roles & Dashboards**
  - **Coach View:**
    - Select and manage multiple teams.
    - View team dashboard with upcoming events and recent activity.
    - Full roster management (add, view, edit, delete players).
    - Send messages to all members, just players, or just parents.
    - Manage team schedule (add/view events).
    - Customize team settings, including uploading a team logo.
  - **Player View:**
    - View personal dashboard with schedule, messages, and team roster.
    - Edit own profile information (name, position, number).
  - **Parent View:**
    - View dashboard with their child's schedule and relevant team messages.
    - View their child's player information.

- **Roster Management**
  - Add new players with details like name, position, number, parent info, and contact details.
  - View a responsive list of all players on the team.
  - Click a player to open a detailed modal view with full contact information.
  - Edit and delete players directly from the player detail view.

- **Communication**
  - Coaches can compose and send messages with a subject and body.
  - Targeted messaging to different groups (all, players, parents).
  - Centralized message history for coaches, players, and parents.

- **Scheduling**
  - Coaches can create new team events (Practice, Game, Meeting, Other) with date, time, location, and details.
  - All users can view a chronological list of upcoming events.

- **AI-Powered Performance Analysis**
  - A dedicated flow (`analyze-performance-data.ts`) to analyze game statistics and player data.
  - Provides overall team analysis, player-specific recommendations, and strategic adjustments.

- **Authentication & Personalization**
  - Simple login system for different user types (Coach, Player, Parent).
  - Coaches can upload and display a custom logo for their team.
