# Firebase Studio

This is a NextJS starter in Firebase Studio.
# firebase

A web-based application for sport coach to communicate and manage player. 

## Features

- **User Roles & Dashboards**
  - **Coach View:**
    - Select and manage multiple teams.
    - View team dashboard with upcoming events and activities and latest messages notofications.
    - Full roster management including photo, first name, last name, nickname, number, position, birth month and year,email and phone (add, view, edit, delete players and respective parent contact information).
    - Add notes to player for coach personal reference and recording
    - Add new player or parent using a coach set 8-digit team code for access with coach approval to confirm join. 
    - Send/reply messages to/from all members, just players, just parents or individual players with option to forward same message to respective parent. All with time stamp.
    - Manage team schedule (add/view events) in calendar or list view. 
    - Manage player attendance and view player/parent indicated attendance.
    - Customize team settings, including uploading a team logo and change team name, plus adding additional coaches to assist managing team.
    - Profile Settings to change coach name, profile photo, contact email and phone. 
  - **Player View:**
    - View personal dashboard with schedule, messages, and team roster.
    - Send/reply message to coach. All with time stamp.
    - Indicate attendance to events and activities. All with time stamp.
    - Edit own profile information (nickname, profile photo, contact email and number).
  - **Parent View:**
    - Select and manage multiple child.
    - View dashboard with their child's schedule and relevant team messages.
    - Send/reply message to coach. All with time stamp.
    - Indicate attendance to events and activities on behalf of child. All with time stamp.
    - View their child's player information.
    - Edit own profile information (first name, last name, contact email and number).


- **Roster Management**
  - Add new players with details like photo, first name, last name, nickname, number, position, email, phone, birth month and year, parent info, and contact details.
  - View a responsive list of all players on the team, with name, number and position, with sort and filter function.
  - Click a player to open a detailed modal view with full contact information, plus any coach's notes of the player.
  - Edit and delete players directly from the player detail view.
  - Coach confirm new player join request, badge with count to notify coach new request.

- **Message**
  - Select and view messaage
  - Coaches can compose and send/reply messages with a subject and body.
  - Player and Parent may compose and send/reply messge with a subject and body only to coach.
  - Targeted messaging to different groups (all, just players, just parents, individual players with option to respecitve parent).
  - Centralized message history for coaches, players, and parents.
  - Notification badge with count

- **Events**
  - Coaches can create new team events (Practice, Game, Meeting, Other) with date, time, location, and details.
  - All users can view a chronological list of upcoming events.
  - All users can click an event to open a detailed modal view with full information
  - Player/parent to indicate attendance option (Attend, Late, Injured, Absent). 
  - Coach may match indicate attendance vs actual attendance with simple checking for records.

- **AI-Powered Performance Analysis**
  - A dedicated flow (`analyze-performance-data.ts`) to analyze game statistics and player data.
  - Provides overall team analysis, player-specific recommendations, and strategic adjustments.

- **Authentication & Personalization**
  - Simple login system for different user types (Coach, Player, Parent).
  - Use email and password to register account.
  - Additional coach join team by email invitation link only. 
  - Player/Parent to enter a team 8-digit code to access team. 
  - Coaches can upload and display a custom logo and name for their team.
