import * as Pages from '../pages';
import { BsTrophyFill } from 'react-icons/bs';
import { FaScroll } from 'react-icons/fa';
export const PAGES = [
    {
        name: 'Achievements',
        about: 'Search for the achievements of a Hypixel player',
        path: '/achievements',
        tags: ['achievements', 'a'],
        component: Pages.AchievementsPage,
        icon: BsTrophyFill
    },
    {
        name: 'Quests',
        about: 'Search for the quests of a Hypixel player',
        path: '/quests',
        tags: ['quests', 'q'],
        component: Pages.QuestsPage,
        icon: FaScroll
    }
]