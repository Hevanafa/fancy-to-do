import { getDayOfYear, getTodayDate } from "./commonDate";

// Quote format:
// > Single string if there's no author
// > An array of 2 string elements:
//     1. Quote
//     2. Author

const quoteList = [
	// About work
	"Today is another chance to get better.",
	"If the plan doesn't work, change the plan but never the goal.",
	"You don't have to be perfect, but you do have to be 100% committed.",
	"Stay positive.  Work hard.  Make it happen.",
	["Believe you can and you're halfway there.", "Theodore Roosevelt"],
	["Don't judge each day by the harvest you reap but by the seeds that you plant.", "Robert Louis Stevenson"],
	["Don't sit down and wait for the opportunities to come.  Get up and make them.", "Madam C.J. Walker"],
	["If people are doubting how far you can go, go so far that you can't hear them anymore.", "Michele Ruiz"],

	// About life
	"When life gives you a hundred reasons to break down and cry, show life that you have a million reasons to smile and laugh.  Stay strong.",
	["Don't let yesterday take up too much of today.", "Will Rogers"],
	"Small steps in the right direction can turn out to be the biggest step of your life.",
	"Whatever you decide to do, make sure it makes you happy.",
	"Your best teacher is your last mistake.",

	// About mental health
	"Friendly reminder that \"doing your best\" does not mean working yourself to the point of a mental breakdown.",
	"You just can't beat the person who never gives up.",
	"Pain is nothing compared to what it feels like to quit.",
	["Be patient with yourself.  Self-growth is tender; it's holy ground.  There's no greater investment.", "Stephen Covey"],
	"Just because you couldn't lift it yesterday, doesn't mean you can't lift it today.  Try again."
];

const getQuoteOfTheDay = () =>
	quoteList[getDayOfYear(getTodayDate()) % quoteList.length];

export {
	getQuoteOfTheDay
};