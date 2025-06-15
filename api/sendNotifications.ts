import { VercelRequest, VercelResponse } from '@vercel/node';
import { bot, MyContext } from '../src/bot';
import { getNewNotifications, getUserIdsFromDatabase, prisma } from '../src/database';
import { getNotificationMessage } from '../src/handlers/start';


export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.headers['x-vercel-cron-event'] !== 'cron') {
    return res.status(401).send('Unauthorized access');
  }

  try {
    console.log('Cron job for sending notifications started!');

    const userIds = await getUserIdsFromDatabase(); //

    if (userIds.length === 0) {
      console.log('No users to send notifications to.');
      return res.status(200).send('No users found.');
    }

    let newNotis = await getNewNotifications();
    for (const userId of userIds) {
      try {
        for (const noti of newNotis) {
          let message = getNotificationMessage(noti)
        await bot.api.sendMessage(userId, message, {
          parse_mode: "MarkdownV2",
        }).catch(e => {}); //
        }
        console.log(`Notification sent to user: ${userId}`);
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
      }
    }

    console.log('Cron job for sending notifications finished.');
    return res.status(200).send('Notifications sent successfully!');
  } catch (error) {
    console.error('Error in cron job:', error);
    return res.status(500).send('Error sending notifications.');
  }
}