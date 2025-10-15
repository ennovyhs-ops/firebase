# Firebase Studio

This is a NextJS starter in Firebase Studio.

# firebase

A web-based application for sport coach to communicate and manage player. 

## Features

- **Authentication & Personalization**
  - Simple login system for different user types (Coach, Player, Parent).
  - Coach, Player and Parent use email and password to register own account.
    - Coach to create new team or request join existing team by entering 8-digit code set by existing coach of team.
    - Player/Parent after login, needs to enter a team 8-digit code to request joining team, to be approved by coach. 
  
- **Coach View:**
 - **Team Selection**
    - Coach select team from respective managing team list.
 - **Dashboards**
    - View team dashboard with upcoming events and activities and latest messages notofications.
 - **Roster Management**
    - View a responsive list of all players on the team, with name, number and position, with sort and filter function.
    - Coach confirm new player join request, badge with count to notify coach new request.
    - Add notes to player for coach personal reference and records.
    - Click a player to open a detailed modal view with full contact information and coaches notes for the player.
    - Full roster management including photo, first name, last name, nickname, number, position, birth month and year,email and phone (add, view, edit, delete players and respective parent contact information).
    - Add new players with details like photo, first name, last name, nickname, number, position, email, phone, birth month and year, parent info, and contact details.
    - Edit and delete players directly from the player detail view.
    - Add new player or parent using a coach set 8-digit team code for access with coach approval to confirm join. 
 - **Message**
    - Select and view messaage list, with sort and filter options.
    - Coaches can compose and send or reply messages with a subject and body.
    - Targeted messaging to different groups (everyone, just players, just parents and/or individual players with option to forward to respecitve parent).
    - Centralized message history for coaches, players, and parents.
    - Notification badge with count.
 - **Events**
   - Coaches can create new and manage team events (Practice, Game, Meeting, Other) with date, time, location, and details.
   - All users can view a chronological list of upcoming events.
   - All users can click an event to open a detailed modal view with full information.
   - Coach may check player/parent indicate attendance vs player actual attendance for records.
   - Manage player attendance and view player/parent indicated attendance.
 - **Setting**
   - **Team Setting**
     - Existing coach to a team may add new coach to join team to help manage by email invitation link. 
     - Coach can upload and display a custom logo and change name for team.
     - Option to select and change managning team
     - Delete team
   - **Profile Setting**
     - Profile Settings to change name, profile photo, contact email and phone.
     - Delete account
 - Bottom navigation bar to navigate between different pages.

- **Player View:**
 - **Dashboards**
   - View personal dashboard on upcoming events and activities and latest messages notofications of all joined teams.
   - Use colour code to display different teams.
   - If joined mulitple teams, provide display all or filter option.
 - **Team Roster**    
   - view team' coaches name
   - Only viewing a responsive list of all players on the team, with name, number and position, with sort and filter function. 
 - **Message**
   - Select and view messaage list, with sort and filter options.
   - Player can compose and send or reply messages with a subject and body.
   - Targeted messaging to just coach or everyone.
   - Centralized message history for coaches, players, and parents.
   - Notification badge with count.
 - **Events**
   - Player only view team events (Practice, Game, Meeting, Other) with date, time, location, and details.
   - All users can view a chronological list of upcoming events.
   - All users can click an event to open a detailed modal view with full information.
   - Player to indicate own attendance to events and activities from options (Attend, Late, Injured, Absent), with time stamp to record.
 - **Setting**
   - **Team Setting**
     - Add 8-digit code to request to join new teams.
     - Send request to respective team coach to unjoin team.
   - **Profile Setting**
     - Profile settings to edit name, nickname, profile photo, contact email and phone.
     - Delete account.
 - Bottom navigation bar to navigate between different pages.
 
- **Parent View:**
 - **Dashboards**
   - View and manage their children's dashboard on upcoming events and activities and latest messages notofications of all joined teams.
   - Use colour code to display different teams.
   - If joined mulitple teams or have children, provide display all or filter option. 
 - **Team Roster**    
   - Only viewing a responsive list of all players on the team, with name, number and position, with sort and filter function. 
 - **Message**
   - Select and view messaage list, with sort and filter options.
   - Parent can compose and send or reply messages with a subject and body.
   - Targeted messaging to just coach, everyone or just parent.
   - Centralized message history for coaches, players, and parents.
   - Notification badge with count.
 - **Events**
   - Parent only view team events (Practice, Game, Meeting, Other) with date, time, location, and details.
   - All users can view a chronological list of upcoming events.
   - All users can click an event to open a detailed modal view with full information.
   - Parent to indicate Player attendance to events and activities from options (Attend, Late, Injured, Absent), with time stamp to record.
 - **Setting**
   - **Team Setting**
     - Add 8-digit code to request to join new teams.
     - Send request to respective team coach to unjoin team.
   - **Profile Setting**
     - Profile settings to edit name, nickname, profile photo, contact email and phone.
     - View and edit respective child Player profile information (first name, last name, contact email and number).
     - Delete account.
- Bottom navigation bar to navigate between different pages.

- **AI-Powered Performance Analysis**
  - A dedicated flow (`analyze-performance-data.ts`) to analyze game statistics and player data.
  - Provides overall team analysis, player-specific recommendations, and strategic adjustments.

