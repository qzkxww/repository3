import { TaskType } from '@/types/task';

export function generateInitialTasks(): TaskType[] {
  return [
    {
      id: '1',
      title: 'Post 1 photo on feed',
      platform: 'Instagram',
      frequency: 'Daily',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Create 2 Stories',
      platform: 'Instagram',
      frequency: 'Daily',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Comment on 3 posts',
      platform: 'Instagram',
      frequency: 'Daily',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Post 1 Tweet',
      platform: 'Twitter',
      frequency: 'Daily',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Reply to 5 Tweets',
      platform: 'Twitter',
      frequency: 'Daily',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Post 1 short video',
      platform: 'TikTok',
      frequency: 'Daily',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '7',
      title: 'Share 1 professional article',
      platform: 'LinkedIn',
      frequency: 'Daily',
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];
}