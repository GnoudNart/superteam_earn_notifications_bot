import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { User, SessionData, NotificationData } from './type'
import { MyContext } from './bot';

const list_skill = ['Frontend', 'Backend', 'Blockchain', 'Mobile', 'Design', 'Community', 'Growth', 'Content', 'Other', 'React', 'Svelte', 'Angular', 'Vue', 'SolidJS', 'Redux', 'Elm', 'Javascript', 'Typescript', 'Node.js', 'PHP', 'Laravel', 'Python', 'Django', 'Kotlin', 'Swift', 'Java', 'C++', 'C', 'Ruby', 'Ruby on Rails', 'Go', 'MySQL', 'Postgres', 'MongoDB', 'Pearl', 'Scala', 'Elixir', 'Haskell', 'Erlang', 'Deno', 'Dart', 'ASP.NET', 'Rust', 'Solidity', 'Move', 'Android', 'iOS', 'Flutter', 'React Native', 'UI/UX Design', 'Graphic Design', 'Illustration', 'Game Design', 'Presentation Design', 'Community Manager', 'Discord Moderator', 'Business Development', 'Digital Marketing', 'Marketing', 'Research', 'Photography', 'Video', 'Video Editing', 'Writing', 'Social Media', 'Data Analytics', 'Operations', 'Product Feedback', 'Product Manager']
const NEW_LISTING: NotificationData[] = [
{
    id: 'ffcbf5cc-99da-4ab1-ae72-b792cec83cfc',
    rewardAmount: 4000,
    deadline: '2025-06-14T10:32:20.701Z',
    type: 'project',
    title: 'Frontend/Fullstack Engineer - Sentient Struggle',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'frontendfullstack-engineer-grit-labs',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Solidity',
'Android',
'Other',
'iOS'
    ],
    region: 'JAPAN',
    publishedAt: '2025-06-12T10:32:20.701Z',
    sponsorName: 'Grit Labs'
  },
{
    id: '27e31606-92be-41ba-a733-d3d81f500f70',
    rewardAmount: 2000,
    deadline: '2025-06-14T20:59:07.000Z',
    type: 'bounty',
    title: 'Build your App with AI on Solana: AImpact Beta Challenge',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'aimpact-beta-challenge',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Graphic Design',
'Javascript',
'Postgres',
'Angular',
'Dart',
'Flutter'
    ],
    region: 'INDIA',
    publishedAt: '2025-06-14T20:59:07.000Z',
    sponsorName: 'Kumeka Team'
  },
{
    id: '89fc0d52-7474-4a7e-95d2-bb5ded29401e',
    rewardAmount: 15000,
    deadline: '2025-06-15T21:59:37.000Z',
    type: 'bounty',
    title: 'dev.fun World Cup powered by Solana',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'devfun-world-cup-powered-by-solana',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Ruby',
'Scala',
'Redux',
'Discord Moderator'
    ],
    region: 'KOREA',
    publishedAt: '2025-06-13T21:59:37.000Z',
    sponsorName: 'Dev.fun'
  },
{
    id: 'd79f0356-7c55-44c1-a05c-fa18e3672e25',
    rewardAmount: 1000,
    deadline: '2025-06-15T23:25:03.000Z',
    type: 'bounty',
    title: 'Develop Telegram Bot for Superteam Earn Notifications',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'telegram-bot-for-earn',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Dart'
    ],
    region: 'CANADA',
    publishedAt: '2025-06-14T23:25:03.000Z',
    sponsorName: 'Superteam'
  },
{
    id: '6946539a-206c-40e2-ad91-a63815e203d3',
    rewardAmount: 1000,
    deadline: '2025-06-16T07:00:39.000Z',
    type: 'bounty',
    title: 'Create the Best Twitter Thread on Yield Trading Using Asgard',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'trade-yields-on-asgard',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Product Manager',
'MySQL',
'Deno',
'C++',
'Flutter',
'Discord Moderator'
    ],
    region: 'TURKEY',
    publishedAt: '2025-06-14T07:00:39.000Z',
    sponsorName: 'Asgard Finance'
  },
{
    id: 'd93d940e-49b7-482b-8cbb-5407e3f637c1',
    rewardAmount: 200,
    deadline: '2025-06-16T11:00:49.557Z',
    type: 'project',
    title: 'Dune Analytics Dashboard Developer for Credible',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'dune-analytics-dashboard-developer-for-credible',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Graphic Design',
'Product Feedback',
'Erlang',
'Move',
'Game Design',
'SolidJS'
    ],
    region: 'BALKAN',
    publishedAt: '2025-06-14T11:00:49.557Z',
    sponsorName: 'Credible Finance'
  },
{
    id: 'b9a8fe38-7b96-492d-9bfa-0dae53f56477',
    rewardAmount: 600,
    deadline: '2025-06-17T09:00:33.139Z',
    type: 'bounty',
    title: 'Sanctum is Hiring a Pixel Wizard! 🧙☁️',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'sanctum-is-hiring-a-pixel-wizard-sf',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Photography',
'Other',
'Redux',
'Social Media'
    ],
    region: 'GERMANY',
    publishedAt: '2025-06-17T09:00:33.139Z',
    sponsorName: 'Sanctum'
  },
{
    id: 'bacd7dd4-e6e7-4625-ae7a-adb57d3e3f28',
    rewardAmount: 100,
    deadline: '2025-06-17T21:11:32.927Z',
    type: 'bounty',
    title: 'Write a Thread about V* by Bad Environment Club',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-thread-about-v-by-bad-environment-club',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Video'
    ],
    region: 'UK',
    publishedAt: '2025-06-17T21:11:32.927Z',
    sponsorName: 'Bad Environment Club'
  },
{
    id: '7871a4cf-d99f-4f30-bd76-65cf39346cd4',
    rewardAmount: 500,
    deadline: '2025-06-17T21:59:42.000Z',
    type: 'bounty',
    title: 'Write a Twitter thread',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'klonborgpad',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Product Feedback',
'Angular',
'Video',
'Laravel',
'Python',
'Svelte'
    ],
    region: 'SINGAPORE',
    publishedAt: '2025-06-15T21:59:42.000Z',
    sponsorName: 'Borgpad'
  },
{
    id: 'fb1343d4-3e1f-4d48-9696-b034f2376399',
    rewardAmount: 20000,
    deadline: '2025-06-18T10:25:59.000Z',
    type: 'bounty',
    title: 'Write a Twitter Thread Promoting Solana App Kit',
    token: 'SEND',
    winnersAnnouncedAt: null,
    slug: 'write-a-banger-twitter-thread-promoting-solana-app-kit',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Erlang',
'Product Feedback',
'Django',
'Deno',
'Dart',
'Android'
    ],
    region: 'BALKAN',
    publishedAt: '2025-06-18T10:25:59.000Z',
    sponsorName: 'thesendcoin'
  },
{
    id: '76afa4dd-43b2-4d94-9dcf-5c519fcc7fef',
    rewardAmount: null,
    deadline: '2025-06-18T14:46:23.530Z',
    type: 'project',
    title: 'Community Manager for Stealth Gamified Trading Platform',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'community-manager-for-stealth-gamified-trading-platform',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'variable',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'C++',
'Dart',
'Vue',
'Kotlin'
    ],
    region: 'TURKEY',
    publishedAt: '2025-06-17T14:46:23.530Z',
    sponsorName: 'Blue7'
  },
{
    id: '759dc10c-9581-4893-b2b0-f453fc8998ba',
    rewardAmount: 300,
    deadline: '2025-06-18T22:00:13.000Z',
    type: 'bounty',
    title: 'Balkan Students Content Competition',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'balkan-student-content-competition',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'iOS',
'Go'
    ],
    region: 'UK',
    publishedAt: '2025-06-17T22:00:13.000Z',
    sponsorName: 'Bitget'
  },
{
    id: '1fa39994-9ce1-4f1a-a745-e1e3905299ef',
    rewardAmount: 150,
    deadline: '2025-06-19T12:28:49.000Z',
    type: 'project',
    title: 'Calling ALL Solana hodlers & meme coiners (Noobs to Pro Trenchers) 🚀',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'calling-all-solana-hodlers-and-meme-coiners-noobs-to-pro-trenchers',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'C++',
'Digital Marketing',
'Node.js',
'Data Analytics'
    ],
    region: 'MALAYSIA',
    publishedAt: '2025-06-18T12:28:49.000Z',
    sponsorName: 'Solana Wallet Tracker'
  },
{
    id: '8ff4860b-d00f-4cca-836c-b0228592c4e3',
    rewardAmount: 1000,
    deadline: '2025-06-20T06:59:40.000Z',
    type: 'bounty',
    title: 'Write a Twitter thread about Global Dollar Network',
    token: 'USDG',
    winnersAnnouncedAt: null,
    slug: 'write-a-twitter-thread-about-global-dollar-network',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Digital Marketing',
'Social Media',
'Python'
    ],
    region: 'UKRAINE',
    publishedAt: '2025-06-20T06:59:40.000Z',
    sponsorName: 'Global Dollar Network'
  },
{
    id: '1410bb0c-56b5-408c-a0be-487102de7960',
    rewardAmount: 350,
    deadline: '2025-06-20T10:34:30.000Z',
    type: 'bounty',
    title: '🎬 "THE FUTURE OF FINANCE" TEASER VIDEO',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'the-future-of-finance-teaser-video',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Erlang',
'Elixir',
'Elm',
'Game Design'
    ],
    region: 'INDIA',
    publishedAt: '2025-06-19T10:34:30.000Z',
    sponsorName: 'Globachain'
  },
{
    id: '72640acb-02ae-41a4-bdc1-d7a918bafff8',
    rewardAmount: 105,
    deadline: '2025-06-20T19:21:59.000Z',
    type: 'bounty',
    title: 'Write a Twitter thread about Sorcerer Extension',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-twitter-thread-about-sorcerer-extension',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Typescript'
    ],
    region: 'GLOBAL',
    publishedAt: '2025-06-18T19:21:59.000Z',
    sponsorName: 'Sorcerer'
  },
{
    id: 'a085ae72-fdff-4697-8574-0c6b8e4e2279',
    rewardAmount: 200,
    deadline: '2025-06-20T20:30:11.140Z',
    type: 'bounty',
    title: 'Frontrun.pro X & Reddit Power-Poster Contest — Drive Beta Sign-Ups, Grab USDC',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'frontrunpro-x-and-reddit-power-poster-contest-drive-beta-sign-ups-grab-usdc',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Go',
'Other',
'Graphic Design',
'Redux',
'ASP.NET',
'Elm'
    ],
    region: 'INDIA',
    publishedAt: '2025-06-20T20:30:11.140Z',
    sponsorName: 'Frontrun.pro'
  },
{
    id: '9cf2d0bb-ac4d-4b09-9386-8034938b3594',
    rewardAmount: null,
    deadline: '2025-06-23T06:51:46.572Z',
    type: 'project',
    title: 'Solana Mobile Developer Intern for HeySolana',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'solana-mobile-developer-intern-for-heysolana',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'range',
    minRewardAsk: 200,
    maxRewardAsk: 500,
    status: 'OPEN',
    skills: [
'Ruby',
'Kotlin'
    ],
    region: 'FRANCE',
    publishedAt: '2025-06-21T06:51:46.572Z',
    sponsorName: 'Hey Solana'
  },
{
    id: 'd70976a9-554a-4e29-9769-5016376e2509',
    rewardAmount: 1,
    deadline: '2025-06-24T10:00:25.000Z',
    type: 'bounty',
    title: 'EthCC 2025 is calling!',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'ethcc-2025-is-calling',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Writing',
'Social Media',
'SolidJS',
'Graphic Design',
'PHP'
    ],
    region: 'UKRAINE',
    publishedAt: '2025-06-24T10:00:25.000Z',
    sponsorName: 'Neon EVM'
  },
{
    id: '59769d59-1e58-4965-92e2-bfa034a22680',
    rewardAmount: 1750,
    deadline: '2025-06-25T18:10:55.505Z',
    type: 'bounty',
    title: '$ME Staking Rewards - Video Bounty',
    token: 'ME',
    winnersAnnouncedAt: null,
    slug: 'magic-eden-staking-rewards',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Rust',
'MySQL',
'Ruby on Rails'
    ],
    region: 'TURKEY',
    publishedAt: '2025-06-24T18:10:55.505Z',
    sponsorName: 'Magic Eden'
  },
{
    id: 'beb3d206-8733-4a66-b8ea-ad0e327af752',
    rewardAmount: 300,
    deadline: '2025-06-25T20:36:49.984Z',
    type: 'bounty',
    title: 'Write a Twitter Thread on Owners Club Experience',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-twitter-thread-on-owners-club-experience',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'ASP.NET',
'Business Development',
'Rust'
    ],
    region: 'UKRAINE',
    publishedAt: '2025-06-24T20:36:49.984Z',
    sponsorName: 'Owners Club '
  },
{
    id: '8701c9bb-29af-4a0e-8734-48134f76e222',
    rewardAmount: null,
    deadline: '2025-06-25T23:05:27.741Z',
    type: 'project',
    title: '🚨Hiring animated short-form video editor (Montage/Story editing)',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'short-form-animated-movie-editor-music-meets-motion',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'range',
    minRewardAsk: 500,
    maxRewardAsk: 2500,
    status: 'OPEN',
    skills: [
'Other',
'Svelte',
'Ruby',
'Product Feedback'
    ],
    region: 'KOREA',
    publishedAt: '2025-06-24T23:05:27.741Z',
    sponsorName: 'Cryptowood'
  },
{
    id: 'bf7fefa0-b5c3-4cfe-bb51-2c776877b0a3',
    rewardAmount: 150,
    deadline: '2025-06-27T12:48:58.000Z',
    type: 'bounty',
    title: 'Make a comic showing travel pain & BukProtocol’s solution using its brand theme.',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'make-a-comic-showing-travel-pain-and-bukprotocols-solution-using-its-brand-theme',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Elixir',
'Pearl',
'Photography'
    ],
    region: 'ISRAEL',
    publishedAt: '2025-06-27T12:48:58.000Z',
    sponsorName: 'BukProtocol'
  },
{
    id: '65cfca17-c12a-4098-88d1-4de26dc29af4',
    rewardAmount: 1500,
    deadline: '2025-06-27T16:59:48.000Z',
    type: 'bounty',
    title: 'Tokenizing Web2 Marketplaces in SEA',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'tokenizing-web2-marketplaces-in-sea',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Kotlin',
'Ruby',
'Deno'
    ],
    region: 'SINGAPORE',
    publishedAt: '2025-06-26T16:59:48.000Z',
    sponsorName: 'Superteam Vietnam'
  },
{
    id: '3ed088f2-e555-408e-bb6e-b776ea12e4e9',
    rewardAmount: 1500,
    deadline: '2025-06-29T17:59:43.000Z',
    type: 'bounty',
    title: 'Web3 M&A Report 2024–2025 (Solana Focus)',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'web3-manda-report-2024-2025-solana-focus',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Typescript',
'Ruby',
'Other'
    ],
    region: 'MEXICO',
    publishedAt: '2025-06-27T17:59:43.000Z',
    sponsorName: 'Superteam Vietnam'
  },
{
    id: '9f9cc5be-832c-43fe-ba1f-cd76ceb9d827',
    rewardAmount: 500,
    deadline: '2025-06-30T07:29:15.000Z',
    type: 'bounty',
    title: 'Solana Spotlight: Bringing Crypto to Everyday Nepalis',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'solana-spotlight-bringing-crypto-to-everyday-nepalis',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Graphic Design',
'Photography',
'Other'
    ],
    region: 'POLAND',
    publishedAt: '2025-06-30T07:29:15.000Z',
    sponsorName: 'Superteam Nepal'
  },
{
    id: '0817a1b9-73dc-4f53-aa3d-a7d68c688d95',
    rewardAmount: 1000,
    deadline: '2025-06-30T12:00:43.000Z',
    type: 'bounty',
    title: 'Toby Network Content War - 1,000 USDC & █████ 🦦',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'toby-content-war',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Graphic Design'
    ],
    region: 'SINGAPORE',
    publishedAt: '2025-06-30T12:00:43.000Z',
    sponsorName: 'Toby Network'
  },
{
    id: 'df5c723e-ad60-440b-a70d-98d973aafd17',
    rewardAmount: 1000,
    deadline: '2025-06-30T15:59:46.000Z',
    type: 'bounty',
    title: 'Create A Video, Memes, or a Twitter Thread for SecondSwap',
    token: 'USDT',
    winnersAnnouncedAt: null,
    slug: 'secondswap-solana-season',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Other',
'Video Editing',
'Scala',
'Elixir',
'Illustration',
'Other'
    ],
    region: 'BRAZIL',
    publishedAt: '2025-06-30T15:59:46.000Z',
    sponsorName: 'SecondSwap'
  },
{
    id: '80e34ab3-58be-4196-93db-c998c6f2d9cc',
    rewardAmount: 500,
    deadline: '2025-07-02T00:48:55.000Z',
    type: 'bounty',
    title: 'Write a H1 impact for Superteam Vietnam',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-h1-impact-for-superteam-vietnam',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Product Feedback'
    ],
    region: 'UAE',
    publishedAt: '2025-07-01T00:48:55.000Z',
    sponsorName: 'Superteam Vietnam'
  },
{
    id: 'd971600a-a57c-4c61-91ac-2aa5986ae3f0',
    rewardAmount: 320,
    deadline: '2025-07-06T08:38:57.000Z',
    type: 'bounty',
    title: 'Write a Compelling Post to Encourage Loofta Platform Users',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-compelling-post-to-encourage-loofta-platform-users',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Vue',
'Illustration',
'Laravel',
'Photography'
    ],
    region: 'GERMANY',
    publishedAt: '2025-07-05T08:38:57.000Z',
    sponsorName: 'loofta'
  },
{
    id: '3b622a31-d4bc-4b62-92be-9415fa8846fa',
    rewardAmount: 500,
    deadline: '2025-07-14T20:34:55.000Z',
    type: 'bounty',
    title: 'Brainstorm & Tweet dApp Ideas for the Xandeum Storage Layer',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'possible-with-xandeum',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Social Media'
    ],
    region: 'TURKEY',
    publishedAt: '2025-07-13T20:34:55.000Z',
    sponsorName: 'Xandeum Labs'
  },
{
    id: 'f48af639-74a0-4908-b32c-bb4641ce6e60',
    rewardAmount: null,
    deadline: '2025-07-31T09:26:27.000Z',
    type: 'project',
    title: '3D Reward Suitcases Animation for NOMADZ',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: '3d-reward-suitcases-animation-for-nomadz',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'range',
    minRewardAsk: 250,
    maxRewardAsk: 400,
    status: 'OPEN',
    skills: [
'Rust',
'Svelte',
'Other',
'Digital Marketing',
'Haskell'
    ],
    region: 'SINGAPORE',
    publishedAt: '2025-07-29T09:26:27.000Z',
    sponsorName: 'Nomadz_co'
  },
{
    id: 'c2b21caa-2b17-4b02-8312-9ec1e07ade34',
    rewardAmount: 1215,
    deadline: '2025-08-31T00:52:45.000Z',
    type: 'bounty',
    title: 'Upshot Meme Competition',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'upshot-meme-competition',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Svelte'
    ],
    region: 'SPAIN',
    publishedAt: '2025-08-31T00:52:45.000Z',
    sponsorName: 'Upshot'
  },
{
    id: '13f196f6-ed79-4fb1-b850-da2eb40983be',
    rewardAmount: 10000,
    deadline: '2025-12-31T16:59:37.000Z',
    type: 'bounty',
    title: 'AIxBlock Bug Bounty Program',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'aixblock-bug-bounty-program',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Android'
    ],
    region: 'GERMANY',
    publishedAt: '2025-12-29T16:59:37.000Z',
    sponsorName: 'AIxBlock'
  },
{
    id: '86edbba0-2823-49e7-bd6a-9ee5d9c4160a',
    rewardAmount: 2500,
    deadline: '2025-06-15T16:00:06.000Z',
    type: 'bounty',
    title: 'AI3 Hackathon 2025 @ London Startup Village',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'ai3-hackathon-2025-london-startup-village',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Other',
'Postgres',
'Python',
'Django'
    ],
    region: 'UAE',
    publishedAt: '2025-06-15T16:00:06.000Z',
    sponsorName: 'Superteam UK'
  },
{
    id: '27e31606-92be-41ba-a733-d3d81f500f70',
    rewardAmount: 2000,
    deadline: '2025-06-15T20:59:07.000Z',
    type: 'bounty',
    title: 'Build your App with AI on Solana: AImpact Beta Challenge',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'aimpact-beta-challenge',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'ASP.NET',
'Solidity',
'PHP',
'React'
    ],
    region: 'INDIA',
    publishedAt: '2025-06-13T20:59:07.000Z',
    sponsorName: 'Kumeka Team'
  },
{
    id: '89fc0d52-7474-4a7e-95d2-bb5ded29401e',
    rewardAmount: 15000,
    deadline: '2025-06-15T21:59:37.000Z',
    type: 'bounty',
    title: 'dev.fun World Cup powered by Solana',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'devfun-world-cup-powered-by-solana',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Django',
'Kotlin'
    ],
    region: 'ARGENTINA',
    publishedAt: '2025-06-14T21:59:37.000Z',
    sponsorName: 'Dev.fun'
  },
{
    id: '60f3c012-7cb2-492e-a18c-ee168539abd2',
    rewardAmount: 1000,
    deadline: '2025-06-15T23:00:26.000Z',
    type: 'bounty',
    title: 'Content Challenge for AI3 Hackathon @ London Startup Village',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'content-challenge-for-ai3-hackathon-london-startup-village',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Pearl',
'Photography'
    ],
    region: 'GERMANY',
    publishedAt: '2025-06-14T23:00:26.000Z',
    sponsorName: 'Superteam UK'
  },
{
    id: 'd79f0356-7c55-44c1-a05c-fa18e3672e25',
    rewardAmount: 1000,
    deadline: '2025-06-15T23:25:03.000Z',
    type: 'bounty',
    title: 'Develop Telegram Bot for Superteam Earn Notifications',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'telegram-bot-for-earn',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Svelte',
'Move',
'Rust',
'PHP',
'Digital Marketing',
'C'
    ],
    region: 'TURKEY',
    publishedAt: '2025-06-14T23:25:03.000Z',
    sponsorName: 'Superteam'
  },
{
    id: '6946539a-206c-40e2-ad91-a63815e203d3',
    rewardAmount: 1000,
    deadline: '2025-06-16T07:00:39.000Z',
    type: 'bounty',
    title: 'Create the Best Twitter Thread on Yield Trading Using Asgard',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'trade-yields-on-asgard',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'React Native',
'Vue'
    ],
    region: 'IRELAND',
    publishedAt: '2025-06-15T07:00:39.000Z',
    sponsorName: 'Asgard Finance'
  },
{
    id: 'd93d940e-49b7-482b-8cbb-5407e3f637c1',
    rewardAmount: 200,
    deadline: '2025-06-16T11:00:49.557Z',
    type: 'project',
    title: 'Dune Analytics Dashboard Developer for Credible',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'dune-analytics-dashboard-developer-for-credible',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Other'
    ],
    region: 'GLOBAL',
    publishedAt: '2025-06-14T11:00:49.557Z',
    sponsorName: 'Credible Finance'
  },
{
    id: 'b9a8fe38-7b96-492d-9bfa-0dae53f56477',
    rewardAmount: 600,
    deadline: '2025-06-17T09:00:33.139Z',
    type: 'bounty',
    title: 'Sanctum is Hiring a Pixel Wizard! 🧙☁️',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'sanctum-is-hiring-a-pixel-wizard-sf',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Game Design',
'MySQL',
'Node.js',
'SolidJS',
'Other'
    ],
    region: 'SINGAPORE',
    publishedAt: '2025-06-16T09:00:33.139Z',
    sponsorName: 'Sanctum'
  },
{
    id: 'bacd7dd4-e6e7-4625-ae7a-adb57d3e3f28',
    rewardAmount: 100,
    deadline: '2025-06-17T21:11:32.927Z',
    type: 'bounty',
    title: 'Write a Thread about V* by Bad Environment Club',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-thread-about-v-by-bad-environment-club',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'MongoDB',
'Solidity',
'Graphic Design'
    ],
    region: 'VIETNAM',
    publishedAt: '2025-06-17T21:11:32.927Z',
    sponsorName: 'Bad Environment Club'
  },
{
    id: '7871a4cf-d99f-4f30-bd76-65cf39346cd4',
    rewardAmount: 500,
    deadline: '2025-06-17T21:59:42.000Z',
    type: 'bounty',
    title: 'Write a Twitter thread',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'klonborgpad',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Pearl',
'Move',
'Photography'
    ],
    region: 'POLAND',
    publishedAt: '2025-06-17T21:59:42.000Z',
    sponsorName: 'Borgpad'
  },
{
    id: 'fb1343d4-3e1f-4d48-9696-b034f2376399',
    rewardAmount: 20000,
    deadline: '2025-06-18T10:25:59.000Z',
    type: 'bounty',
    title: 'Write a Twitter Thread Promoting Solana App Kit',
    token: 'SEND',
    winnersAnnouncedAt: null,
    slug: 'write-a-banger-twitter-thread-promoting-solana-app-kit',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Redux',
'Writing',
'C++',
'Other'
    ],
    region: 'ARGENTINA',
    publishedAt: '2025-06-16T10:25:59.000Z',
    sponsorName: 'thesendcoin'
  },
{
    id: '76afa4dd-43b2-4d94-9dcf-5c519fcc7fef',
    rewardAmount: null,
    deadline: '2025-06-18T14:46:23.530Z',
    type: 'project',
    title: 'Community Manager for Stealth Gamified Trading Platform',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'community-manager-for-stealth-gamified-trading-platform',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'variable',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Community Manager',
'Node.js',
'Deno',
'Business Development',
'Other'
    ],
    region: 'GLOBAL',
    publishedAt: '2025-06-16T14:46:23.530Z',
    sponsorName: 'Blue7'
  },
{
    id: '759dc10c-9581-4893-b2b0-f453fc8998ba',
    rewardAmount: 300,
    deadline: '2025-06-18T22:00:13.000Z',
    type: 'bounty',
    title: 'Balkan Students Content Competition',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'balkan-student-content-competition',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Rust',
'Java',
'Dart',
'React Native',
'Video Editing'
    ],
    region: 'SPAIN',
    publishedAt: '2025-06-16T22:00:13.000Z',
    sponsorName: 'Bitget'
  },
{
    id: '1fa39994-9ce1-4f1a-a745-e1e3905299ef',
    rewardAmount: 150,
    deadline: '2025-06-19T12:28:49.000Z',
    type: 'project',
    title: 'Calling ALL Solana hodlers & meme coiners (Noobs to Pro Trenchers) 🚀',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'calling-all-solana-hodlers-and-meme-coiners-noobs-to-pro-trenchers',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Community Manager',
'Product Manager'
    ],
    region: 'GLOBAL',
    publishedAt: '2025-06-18T12:28:49.000Z',
    sponsorName: 'Solana Wallet Tracker'
  },
{
    id: '8ff4860b-d00f-4cca-836c-b0228592c4e3',
    rewardAmount: 1000,
    deadline: '2025-06-20T06:59:40.000Z',
    type: 'bounty',
    title: 'Write a Twitter thread about Global Dollar Network',
    token: 'USDG',
    winnersAnnouncedAt: null,
    slug: 'write-a-twitter-thread-about-global-dollar-network',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Java',
'Kotlin',
'C++',
'C',
'Python',
'SolidJS'
    ],
    region: 'GLOBAL',
    publishedAt: '2025-06-19T06:59:40.000Z',
    sponsorName: 'Global Dollar Network'
  },
{
    id: '1410bb0c-56b5-408c-a0be-487102de7960',
    rewardAmount: 350,
    deadline: '2025-06-20T10:34:30.000Z',
    type: 'bounty',
    title: '🎬 "THE FUTURE OF FINANCE" TEASER VIDEO',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'the-future-of-finance-teaser-video',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Marketing',
'React',
'MySQL',
'Other',
'React Native',
'Typescript'
    ],
    region: 'PHILIPPINES',
    publishedAt: '2025-06-19T10:34:30.000Z',
    sponsorName: 'Globachain'
  },
{
    id: '72640acb-02ae-41a4-bdc1-d7a918bafff8',
    rewardAmount: 105,
    deadline: '2025-06-20T19:21:59.000Z',
    type: 'bounty',
    title: 'Write a Twitter thread about Sorcerer Extension',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-twitter-thread-about-sorcerer-extension',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Data Analytics',
'Video Editing',
'Marketing',
'Other',
'PHP'
    ],
    region: 'IRELAND',
    publishedAt: '2025-06-20T19:21:59.000Z',
    sponsorName: 'Sorcerer'
  },
{
    id: 'a085ae72-fdff-4697-8574-0c6b8e4e2279',
    rewardAmount: 200,
    deadline: '2025-06-20T20:30:11.140Z',
    type: 'bounty',
    title: 'Frontrun.pro X & Reddit Power-Poster Contest — Drive Beta Sign-Ups, Grab USDC',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'frontrunpro-x-and-reddit-power-poster-contest-drive-beta-sign-ups-grab-usdc',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Android',
'Illustration',
'Deno',
'Solidity',
'Swift',
'Javascript'
    ],
    region: 'INDIA',
    publishedAt: '2025-06-18T20:30:11.140Z',
    sponsorName: 'Frontrun.pro'
  },
{
    id: 'a24e1aec-86e7-47f9-9b6a-575627afed53',
    rewardAmount: null,
    deadline: '2025-06-20T22:41:22.758Z',
    type: 'project',
    title: '💲Hiring researcher for crypto documentary videos',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'hiring-researcher-for-crypto-documentary-videos',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'range',
    minRewardAsk: 500,
    maxRewardAsk: 1500,
    status: 'OPEN',
    skills: [
'MySQL',
'React'
    ],
    region: 'INDIA',
    publishedAt: '2025-06-19T22:41:22.758Z',
    sponsorName: 'Cryptowood'
  },
{
    id: '7d47c4e0-8732-449c-bd1d-a6206db694fa',
    rewardAmount: 250,
    deadline: '2025-06-21T10:00:24.000Z',
    type: 'bounty',
    title: 'Write a Twitter Thread Sanafi Ethical Flywheel (SEF)',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-twitter-thread-sanafi-ethical-flywheel-sef',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'SolidJS',
'Javascript',
'Video Editing',
'MongoDB'
    ],
    region: 'GLOBAL',
    publishedAt: '2025-06-20T10:00:24.000Z',
    sponsorName: 'Sanafi Onchain'
  },
{
    id: '91275810-efa8-4712-94b4-3e4ca0aa8d6b',
    rewardAmount: 300,
    deadline: '2025-06-22T00:00:36.000Z',
    type: 'bounty',
    title: 'Provide LastMint Play Test Feedback',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'lastmint-playtest-feedback',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Writing',
'Flutter',
'Android'
    ],
    region: 'PHILIPPINES',
    publishedAt: '2025-06-20T00:00:36.000Z',
    sponsorName: 'LastMint'
  },
{
    id: '9cf2d0bb-ac4d-4b09-9386-8034938b3594',
    rewardAmount: null,
    deadline: '2025-06-23T06:51:46.572Z',
    type: 'project',
    title: 'Solana Mobile Developer Intern for HeySolana',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'solana-mobile-developer-intern-for-heysolana',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'range',
    minRewardAsk: 200,
    maxRewardAsk: 500,
    status: 'OPEN',
    skills: [
'Other',
'Swift',
'Redux',
'MongoDB',
'Other'
    ],
    region: 'CANADA',
    publishedAt: '2025-06-22T06:51:46.572Z',
    sponsorName: 'Hey Solana'
  },
{
    id: 'd70976a9-554a-4e29-9769-5016376e2509',
    rewardAmount: 1,
    deadline: '2025-06-24T10:00:25.000Z',
    type: 'bounty',
    title: 'EthCC 2025 is calling!',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'ethcc-2025-is-calling',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Writing'
    ],
    region: 'POLAND',
    publishedAt: '2025-06-22T10:00:25.000Z',
    sponsorName: 'Neon EVM'
  },
{
    id: '49135b77-4c1d-4944-a737-129efd7b9d2d',
    rewardAmount: 1600,
    deadline: '2025-06-25T12:02:56.000Z',
    type: 'bounty',
    title: 'Deep Dive: Competitive analysis of token launchpads on Solana',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'deep-dive-competitive-analysis-of-token-launchpads-on-solana',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Other'
    ],
    region: 'BRAZIL',
    publishedAt: '2025-06-25T12:02:56.000Z',
    sponsorName: 'MetaDAO'
  },
{
    id: '59769d59-1e58-4965-92e2-bfa034a22680',
    rewardAmount: 1750,
    deadline: '2025-06-25T18:10:55.505Z',
    type: 'bounty',
    title: '$ME Staking Rewards - Video Bounty',
    token: 'ME',
    winnersAnnouncedAt: null,
    slug: 'magic-eden-staking-rewards',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Graphic Design',
'Deno',
'Other',
'Digital Marketing',
'Other',
'Ruby'
    ],
    region: 'GERMANY',
    publishedAt: '2025-06-23T18:10:55.505Z',
    sponsorName: 'Magic Eden'
  },
{
    id: 'beb3d206-8733-4a66-b8ea-ad0e327af752',
    rewardAmount: 300,
    deadline: '2025-06-25T20:36:49.984Z',
    type: 'bounty',
    title: 'Write a Twitter Thread on Owners Club Experience',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-twitter-thread-on-owners-club-experience',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Writing',
'Research',
'Rust',
'Solidity'
    ],
    region: 'IRELAND',
    publishedAt: '2025-06-23T20:36:49.984Z',
    sponsorName: 'Owners Club '
  },
{
    id: '8701c9bb-29af-4a0e-8734-48134f76e222',
    rewardAmount: null,
    deadline: '2025-06-25T23:05:27.741Z',
    type: 'project',
    title: '🚨Hiring animated short-form video editor (Montage/Story editing)',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'short-form-animated-movie-editor-music-meets-motion',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'range',
    minRewardAsk: 500,
    maxRewardAsk: 2500,
    status: 'OPEN',
    skills: [
'Swift',
'Svelte',
'Laravel',
'Other',
'Django'
    ],
    region: 'GERMANY',
    publishedAt: '2025-06-23T23:05:27.741Z',
    sponsorName: 'Cryptowood'
  },
{
    id: 'de1c0adb-9de5-467e-86e2-69f5f9c94197',
    rewardAmount: 300,
    deadline: '2025-06-26T00:00:45.000Z',
    type: 'bounty',
    title: 'Create a 90-Second Hype Video for LastMint Launch',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'video-for-lastmint-launch',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'C++'
    ],
    region: 'VIETNAM',
    publishedAt: '2025-06-25T00:00:45.000Z',
    sponsorName: 'LastMint'
  },
{
    id: 'bf7fefa0-b5c3-4cfe-bb51-2c776877b0a3',
    rewardAmount: 150,
    deadline: '2025-06-27T12:48:58.000Z',
    type: 'bounty',
    title: 'Make a comic showing travel pain & BukProtocol’s solution using its brand theme.',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'make-a-comic-showing-travel-pain-and-bukprotocols-solution-using-its-brand-theme',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'C',
'Laravel'
    ],
    region: 'UK',
    publishedAt: '2025-06-25T12:48:58.000Z',
    sponsorName: 'BukProtocol'
  },
{
    id: '65cfca17-c12a-4098-88d1-4de26dc29af4',
    rewardAmount: 1500,
    deadline: '2025-06-27T16:59:48.000Z',
    type: 'bounty',
    title: 'Tokenizing Web2 Marketplaces in SEA',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'tokenizing-web2-marketplaces-in-sea',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Svelte'
    ],
    region: 'BALKAN',
    publishedAt: '2025-06-25T16:59:48.000Z',
    sponsorName: 'Superteam Vietnam'
  },
{
    id: '3ed088f2-e555-408e-bb6e-b776ea12e4e9',
    rewardAmount: 1500,
    deadline: '2025-06-29T17:59:43.000Z',
    type: 'bounty',
    title: 'Web3 M&A Report 2024–2025 (Solana Focus)',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'web3-manda-report-2024-2025-solana-focus',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Other',
'Graphic Design',
'Django',
'Video',
'SolidJS'
    ],
    region: 'GERMANY',
    publishedAt: '2025-06-29T17:59:43.000Z',
    sponsorName: 'Superteam Vietnam'
  },
{
    id: '9f9cc5be-832c-43fe-ba1f-cd76ceb9d827',
    rewardAmount: 500,
    deadline: '2025-06-30T07:29:15.000Z',
    type: 'bounty',
    title: 'Solana Spotlight: Bringing Web3 to Everyday Nepalis',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'solana-spotlight-bringing-crypto-to-everyday-nepalis',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Other',
'SolidJS',
'C',
'Game Design',
'Scala',
'Illustration'
    ],
    region: 'UKRAINE',
    publishedAt: '2025-06-28T07:29:15.000Z',
    sponsorName: 'Superteam Nepal'
  },
{
    id: '0817a1b9-73dc-4f53-aa3d-a7d68c688d95',
    rewardAmount: 1000,
    deadline: '2025-06-30T12:00:43.000Z',
    type: 'bounty',
    title: 'Toby Network Content War - 1,000 USDC & █████ 🦦',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'toby-content-war',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Redux'
    ],
    region: 'TURKEY',
    publishedAt: '2025-06-28T12:00:43.000Z',
    sponsorName: 'Toby Network'
  },
{
    id: 'df5c723e-ad60-440b-a70d-98d973aafd17',
    rewardAmount: 1000,
    deadline: '2025-06-30T15:59:46.000Z',
    type: 'bounty',
    title: 'Create A Video, Memes, or a Twitter Thread for SecondSwap',
    token: 'USDT',
    winnersAnnouncedAt: null,
    slug: 'secondswap-solana-season',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Angular',
'Video'
    ],
    region: 'BRAZIL',
    publishedAt: '2025-06-29T15:59:46.000Z',
    sponsorName: 'SecondSwap'
  },
{
    id: '80e34ab3-58be-4196-93db-c998c6f2d9cc',
    rewardAmount: 500,
    deadline: '2025-07-02T00:48:55.000Z',
    type: 'bounty',
    title: 'Write a H1 impact for Superteam Vietnam',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-h1-impact-for-superteam-vietnam',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Erlang',
'Swift',
'React Native'
    ],
    region: 'UK',
    publishedAt: '2025-07-02T00:48:55.000Z',
    sponsorName: 'Superteam Vietnam'
  },
{
    id: 'd971600a-a57c-4c61-91ac-2aa5986ae3f0',
    rewardAmount: 320,
    deadline: '2025-07-06T08:38:57.000Z',
    type: 'bounty',
    title: 'Write a Compelling Post to Encourage Loofta Platform Users',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'write-a-compelling-post-to-encourage-loofta-platform-users',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Scala',
'Operations'
    ],
    region: 'INDIA',
    publishedAt: '2025-07-04T08:38:57.000Z',
    sponsorName: 'loofta'
  },
{
    id: '3b622a31-d4bc-4b62-92be-9415fa8846fa',
    rewardAmount: 500,
    deadline: '2025-07-14T20:34:55.000Z',
    type: 'bounty',
    title: 'Brainstorm & Tweet dApp Ideas for the Xandeum Storage Layer',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'possible-with-xandeum',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Discord Moderator',
'Data Analytics',
'Flutter'
    ],
    region: 'GLOBAL',
    publishedAt: '2025-07-14T20:34:55.000Z',
    sponsorName: 'Xandeum Labs'
  },
{
    id: 'f48af639-74a0-4908-b32c-bb4641ce6e60',
    rewardAmount: null,
    deadline: '2025-07-31T09:26:27.000Z',
    type: 'project',
    title: '3D Reward Suitcases Animation for NOMADZ',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: '3d-reward-suitcases-animation-for-nomadz',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'range',
    minRewardAsk: 250,
    maxRewardAsk: 400,
    status: 'OPEN',
    skills: [
'Go',
'Product Feedback',
'Node.js',
'Ruby on Rails',
'Other',
'Photography'
    ],
    region: 'KOREA',
    publishedAt: '2025-07-29T09:26:27.000Z',
    sponsorName: 'Nomadz_co'
  },
{
    id: 'c2b21caa-2b17-4b02-8312-9ec1e07ade34',
    rewardAmount: 1215,
    deadline: '2025-08-31T00:52:45.000Z',
    type: 'bounty',
    title: 'Upshot Meme Competition',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'upshot-meme-competition',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Writing',
'Flutter',
'Other',
'Move',
'Other'
    ],
    region: 'INDIA',
    publishedAt: '2025-08-31T00:52:45.000Z',
    sponsorName: 'Upshot'
  },
{
    id: '13f196f6-ed79-4fb1-b850-da2eb40983be',
    rewardAmount: 10000,
    deadline: '2025-12-31T16:59:37.000Z',
    type: 'bounty',
    title: 'AIxBlock Bug Bounty Program',
    token: 'USDC',
    winnersAnnouncedAt: null,
    slug: 'aixblock-bug-bounty-program',
    isWinnersAnnounced: false,
    isFeatured: false,
    compensationType: 'fixed',
    minRewardAsk: null,
    maxRewardAsk: null,
    status: 'OPEN',
    skills: [
'Research',
'Other',
'Laravel',
'Redux',
'Photography'
    ],
    region: 'CANADA',
    publishedAt: '2025-12-30T16:59:37.000Z',
    sponsorName: 'AIxBlock'
  }
];


export async function getUserIdsFromDatabase(): Promise<number[]> {
  try {
    const enabledUsers = await prisma.user.findMany({
      where: {
        isEnableNoti: true,
      },
      select: {
        chatId: true,
      },
    });
    // Chuyển BigInt về number. Cẩn thận với các chatId quá lớn không vừa với number
    return enabledUsers.map(user => Number(user.chatId));
  } catch (error) {
    console.error('Error fetching user IDs from database:', error);
    throw error;
  } finally {
    // Không đóng kết nối ở đây nếu hàm này được gọi thường xuyên (ví dụ trong mỗi request)
    // Prisma Client quản lý kết nối hiệu quả.
    // await prisma.$disconnect(); // Chỉ đóng khi ứng dụng tắt hẳn
  }
}

// end region



// Example usage
// export async function main() {
//  const userSessionData: SessionData = {
//     activeMessageId: 123,
//     minValue: 0,
//     maxValue: 10000,
//     isBounties: true,
//     isProjects: true,
//     skills: ['UI/UX Design', 'Solidity'], // User is interested in these skills
//     location: '', // User interested in all locations
//     hasSet: true,
//     isEnableNoti: true, // Notifications are enabled
//   };

//   console.log("Generating notifications with the following session data:");
//   console.log(userSessionData);
//   console.log("\n--- Generated Notifications (Raw Objects) ---");

//   try {
//     const notificationsList: NotificationData[] = await generateNotifications(userSessionData);

//     if (notificationsList.length > 0) {
//       notificationsList.forEach((notification, index) => {
//         console.log(`\nNotification Object ${index + 1}:`);
//         console.log(notification); // This will now log the full Notification object
//       });
//     } else {
//       console.log("No new notifications match the criteria.");
//     }

//     testNotyByChatId()
//   } catch (error) {
//     console.error("Failed to generate notifications:", error);
//   }
// }

// async function testNotyByChatId() {
//   const testChatId = "13063656912"; // ID để test

//   try {
//     // --- Chuẩn bị dữ liệu test ---
//     // Xóa session cũ nếu có để đảm bảo môi trường sạch
//     await prisma.session.deleteMany({
//       where: { key: testChatId }
//     });
//     console.log(`Đã xóa tất cả session có key '${testChatId}' (nếu có).`);

//     // Tạo một session giả định để thử nghiệm
//     const createdSession = await prisma.session.create({
//       data: {
//         key: testChatId,
//         value: JSON.stringify({
//           hasSet: true,
//           isEnableNoti: true,
//           isProjects: true,
//           isBounties: true, // Kích hoạt cả project và bounty
//           skills: ['JavaScript', 'React', 'Python'], // Kỹ năng để khớp với NEW_LISTING
//           location: 'JAPAN' // Địa điểm
//         })
//       }
//     });
//     console.log(`Đã tạo session test với key '${createdSession.key}'.`);

//     // --- Thực thi hàm cần test -generateNotificationsByChatId--
//     console.log(`\nĐang tạo thông báo cho chat_id: '${testChatId}'...`);
//     const notifications = await generateNotificationsByChatId(testChatId);

//     // --- Kiểm tra kết quả ---
//     if (notifications.length > 0) {
//       console.log(`\nTìm thấy ${notifications.length} thông báo cho chat_id '${testChatId}':`);
//       notifications.forEach((noti, index) => {
//         console.log(`  Thông báo ${index + 1}:`);
//         console.log(`    ID: ${noti.id}`);
//         console.log(`    Tiêu đề: ${noti.title}`);
//         console.log(`    Loại: ${noti.type}`);
//         console.log(`    Kỹ năng: ${noti.skills.join(', ')}`);
//         console.log(`    Khu vực: ${noti.region}`);
//         console.log(`    Published At: ${noti.publishedAt}`);
//         console.log(`    Trạng thái: ${noti.status}`);
//         console.log('---');
//       });
//     } else {
//       console.log(`\nKhông tìm thấy thông báo nào cho chat_id '${testChatId}'.`);
//     }

//     // --- Test trường hợp không có session ---
//     const nonExistentChatId = "non_existent_chat_id";
//     console.log(`\nĐang tạo thông báo cho chat_id không tồn tại: '${nonExistentChatId}'...`);
//     const noNotifications = await generateNotificationsByChatId(nonExistentChatId);
//     if (noNotifications.length === 0) {
//       console.log(`  Kết quả đúng: Không tìm thấy thông báo nào cho chat_id '${nonExistentChatId}'.`);
//     } else {
//       console.error(`  Kết quả SAI: Tìm thấy thông báo cho chat_id không tồn tại.`);
//     }

//   } catch (error: any) {
//     console.error("Đã xảy ra lỗi trong quá trình test:", error);
//   } finally {
//     // Đảm bảo đóng kết nối Prisma
//     await prisma.$disconnect();
//     console.log("\nĐã đóng kết nối Prisma.");
//   }
// }

export async function generateNotifications(sessionData: SessionData): Promise<NotificationData[]> {
  try {
    // Get current time and 12 hours ago threshold
    // Using a fixed time for demonstration based on the provided current time (Monday, June 16, 2025 at 2:18:52 AM +07)
    // In a real application, you'd use new Date() for `now`
    const now = new Date('2025-06-16T02:18:52+07:00');
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

    // Filter listings
    const notifications = NEW_LISTING
      .filter((listing) => {
        // Check if listing matches session criteria
        const matchesType = (sessionData.isProjects && listing.type === 'project') ||
                            (sessionData.isBounties && listing.type === 'bounty');
        const matchesSkills = sessionData.skills.length === 0 ||
                              listing.skills.some((skill) => sessionData.skills.includes(skill));
        const matchesLocation = !sessionData.location || listing.region === sessionData.location;
        const matchesTime = new Date(listing.publishedAt) <= twelveHoursAgo; // This is the crucial check
        const matchesStatus = listing.status === 'OPEN';

        return sessionData.isEnableNoti &&
               matchesType &&
               matchesSkills &&
               matchesLocation &&
               matchesTime &&
               matchesStatus;
      });

    return notifications;
  } catch (error: any) {
    console.error('Error generating notifications:', error);
    throw new Error(`Failed to generate notifications: ${error.message}`);
  }
}

export async function generateNotificationsByChatId(chat_id: string): Promise<NotificationData[]> {
  try {
    // 1. Lấy tất cả session data cho chat_id được cung cấp
    const sessions = await getSessionsByChatId(chat_id);

    // 2. Nếu không tìm thấy session nào, trả về mảng rỗng
    if (sessions.length === 0) {
      console.log(`Không tìm thấy session nào cho chat_id '${chat_id}'.`);
      return [];
    }

    // 3. Duyệt qua từng session và tạo thông báo
    let allNotifications: NotificationData[] = [];
    for (const session of sessions) {
      // Đảm bảo session.isEnableNoti là true trước khi tạo thông báo
      if (session.isEnableNoti) {
        try {
          const notificationsForSession = await generateNotifications(session);
          allNotifications = allNotifications.concat(notificationsForSession);
        } catch (notificationError) {
          console.error(`Lỗi khi tạo thông báo cho session của chat_id '${chat_id}':`, notificationError);
          // Tiếp tục với các session khác nếu có lỗi
        }
      } else {
        console.log(`Session cho chat_id '${chat_id}' không bật thông báo (isEnableNoti = false).`);
      }
    }

    // Trả về tất cả các thông báo đã tạo
    return allNotifications;
  } catch (error: any) {
    console.error(`Lỗi tổng quát khi tạo thông báo cho chat_id '${chat_id}':`, error);
    // Ném lỗi để xử lý ở tầng cao hơn
    throw new Error(`Không thể tạo thông báo cho chat_id '${chat_id}': ${error.message}`);
  }
}

export async function getNotificationsDataBySessionData(session: SessionData): Promise<NotificationData[]> {
  try {
    const sessionData = session;
    const notifications = NEW_LISTING
      .filter((listing) => {
        // Check if listing matches session criteria
        const matchesType = (sessionData.isProjects && listing.type === 'project') ||
                            (sessionData.isBounties && listing.type === 'bounty');
        const matchesSkills = listing.skills.length === 0 ||
                              listing.skills.some((skill) => sessionData.skills.indexOf(skill) >= 0);
        const matchesLocation = listing.region.toUpperCase() === sessionData.location.toUpperCase() || listing.region.toUpperCase() === "GLOBAL";
        const matchesStatus = listing.status === 'OPEN';
        return sessionData.isEnableNoti &&
               matchesType &&
               matchesSkills &&
               matchesLocation &&
               matchesStatus;
      });
    return notifications;
  } catch (error: any) {
    return [];
  }
}

export async function getPreferenceNoti(ctx: MyContext): Promise<NotificationData[]> {
  try {
    const numNews = 5;
    let allNotifications = await getNotificationsDataBySessionData(ctx.session);
    return allNotifications.slice(0, numNews);
  } catch (error: any) {
    return [];
  }
}

export async function getNewestCampaigns(): Promise<NotificationData[]> {
  try {
    const numNews = 5;
    let allNotifications = NEW_LISTING.slice(0, numNews);
    return allNotifications;
  } catch (error: any) {
    return [];
  }
}

export async function getFilteredSessionsMap(): Promise<Map<string, SessionData>> {
  try {
    // Fetch all sessions from the database
    const sessions = await prisma.session.findMany({
      select: {
        key: true,
        value: true,
      },
    });

    // Create a Map to store key -> SessionData
    const sessionMap = new Map<string, SessionData>();

    // Iterate through sessions, parse value, and filter
    for (const session of sessions) {
      try {
        // Parse the value string to SessionData object
        const sessionData: SessionData = JSON.parse(session.value);

        // Check if session meets filter criteria
        if (sessionData.hasSet === true && sessionData.isEnableNoti === true) {
          sessionMap.set(session.key, sessionData);
        }
      } catch (parseError) {
        console.error(`Error parsing session value for key ${session.key}:`, parseError);
        continue; // Skip invalid sessions
      }
    }

    return sessionMap;
  } catch (error) {
    console.error('Error fetching sessions from database:', error);
    throw error;
  }
}

export async function getSessionsByChatId(chat_id: string): Promise<SessionData[]> {
  try {
    // Tìm kiếm tất cả các session có key trùng khớp với chat_id
    const sessions = await prisma.session.findMany({
      where: {
        key: chat_id, // Lọc theo key trùng với chat_id được truyền vào
      },
      select: {
        key: true,
        value: true,
      },
    });

    const filteredSessions: SessionData[] = [];

    // Duyệt qua các session tìm được, phân tích cú pháp giá trị và thêm vào danh sách
    for (const session of sessions) {
      try {
        // Phân tích cú pháp chuỗi value thành đối tượng SessionData
        const sessionData: SessionData = JSON.parse(session.value);
        filteredSessions.push(sessionData);
      } catch (parseError) {
        console.error(`Lỗi khi phân tích giá trị session cho khóa ${session.key}:`, parseError);
        continue; // Bỏ qua các session không hợp lệ
      }
    }

    return filteredSessions;
  } catch (error) {
    console.error(`Lỗi khi lấy session từ cơ sở dữ liệu với chat_id ${chat_id}:`, error);
    throw error; // Ném lỗi để xử lý ở tầng cao hơn
  }
}

// Hàm để kiểm tra kết nối database
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    // Thử truy vấn một cái gì đó đơn giản để đảm bảo kết nối hoạt động
    // Ví dụ: đếm số lượng người dùng
    await prisma.user.count();
    console.log('Database connection successful!');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  } finally {
    // Không đóng kết nối ở đây để tránh mở lại kết nối cho mỗi yêu cầu
    // prisma.$disconnect() chỉ nên gọi khi ứng dụng tắt
  }
}

// Export prisma client để các module khác có thể sử dụng (ví dụ để lưu user mới)
export { prisma };