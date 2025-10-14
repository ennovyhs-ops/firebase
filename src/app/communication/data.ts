
import { addDays, formatISO } from "date-fns";

export type Conversation = {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  timestamp: string;
  body: string;
};

const today = new Date();

export const conversations: Conversation[] = [
  {
    id: "msg1",
    subject: "Practice Canceled Today",
    sender: "Coach Steve",
    recipient: "Entire Team",
    timestamp: formatISO(addDays(today, -1)),
    body: "Hi team,\n\nUnfortunately, due to the weather, we'll have to cancel practice today. Stay safe and we'll see you at Thursday's session.\n\nBest,\nCoach Steve",
  },
  {
    id: "msg2",
    subject: "Game this Saturday - Details",
    sender: "Coach Steve",
    recipient: "Entire Team",
    timestamp: formatISO(addDays(today, -3)),
    body: "Team,\n\nReminder about our game this Saturday against the Eagles. Please arrive at the City Arena by 9:00 AM sharp. Wear your blue jerseys.\n\nLet's get that win!\n\nCoach Steve",
  },
  {
    id: "msg3",
    subject: "Re: Your shooting form",
    sender: "Coach Steve",
    recipient: "Alex Johnson",
    timestamp: formatISO(addDays(today, -5)),
    body: "Hey Alex,\n\nGreat work in practice yesterday. I noticed a small adjustment we can make to your shooting form that I think will really help with consistency. Let's work on it for 10 minutes before next practice.\n\nCoach",
  },
    {
    id: "msg4",
    subject: "Fundraising Event Next Month",
    sender: "Coach Steve",
    recipient: "Parents Only",
    timestamp: formatISO(addDays(today, -8)),
    body: "Dear Parents,\n\nWe're planning a team fundraising event next month to help cover tournament fees. We'll be hosting a car wash on the 15th. More details to follow, but please save the date if you're able to help out.\n\nThanks,\nCoach Steve",
  },
];
