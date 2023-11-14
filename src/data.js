export const task = [
  {
    id: 0,
    title: `Make dinner`,
    description: `Prepare the dinner for my Sister's birthday And the buy of a awesome`,
    subtask: [],
    dueDate: '12-23-2023',
    tag: 'Vacation',
    tagColor: '',
    project: 'Default',
    projectColor: '#eb896c',
  },
  {
    id: 1,
    title: `New PC`,
    description: `Buy a new PC for my birthday`,
    subtask: [],
    dueDate: '02-14-2024',
    tag: 'Productivity',
    tagColor: '',
    project: 'Coding',
    projectColor: '#d22828',
  }
];

export const taskInput = {
  taskTitle: '',
  taskDescription: '',
  taskDate: '',
};

export const projectInput = {
  nameProject: '',
  projectColor: '#FFFFFF'
};

export const tagInput = {
  nameTag: '',
  tagColor: '#FFFFFF'
}

export const userProjects = [
  {
    id: 0,
    nameProject: 'Default',
    color: '#eb896c',
  },
  {
    id: 1,
    nameProject: 'Coding',
    color: '#d22828'
  },
  {
    id: 2,
    nameProject: 'Vacations',
    color: '#45f542'
  },
  {
    id: 3,
    nameProject: 'Computer',
    color: '#426cf5'
  },
];

export const taskProjectInput = {
  taskProjectName: userProjects[0].nameProject,
  taskProjectColor: userProjects[0].color
}

export const userTags = [
  {
    id: 0,
    nameTag: 'Default Project',
    color: '#e4b1a0',
  },
  {
    id: 1,
    nameTag: 'Vacations',
    color: '#e4eeff',
  },
  {
    id: 2,
    nameTag: 'Coding idea',
    color: '#c5c5c5',
  },
  {
    id: 3,
    nameTag: 'Vacations',
    color: '#db842b',
  },
];

export const taskTagInput = {
  taskTagName: userTags[0].nameTag,
  taskTagColor: userTags[0].color,
}

export const user = [
  { id: 1, name: 'Michael' },
  { id: 2, name: 'Dwight' },
  { id: 3, name: 'Jim' },
  { id: 4, name: 'Pam' },
];

export const userNotes = [
  {
    id: 0,
    noteTitle: 'Projects',
    noteContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
    noteTag: '',
    noteTagColor: '#FFFFFF',
    isSettings: false,
  },
  {
    id: 1,
    noteTitle: 'Calendar',
    noteContent: 'Create a Todo App for my portfolio ',
    noteTag: '',
    noteTagColor: '#FFFFFF',
    isSettings: false,
  },
  {
    id: 2,
    noteTitle: 'Notes',
    noteContent: 'Create a Todo App for my portfolio ',
    noteTag: '',
    noteTagColor: '#FFFFFF',
    isSettings: false,
  },
  // {
  //   id: 3,
  //   noteTitle: 'Projects',
  //   noteContent: 'Create a Todo App for my portfolio ',
  //   noteTag: '',
  // },
  // {
  //   id: 4,
  //   noteTitle: 'Calendar',
  //   noteContent: 'Create a Todo App for my portfolio ',
  //   noteTag: '',
  // },
  // {
  //   id: 5,
  //   noteTitle: 'Notes',
  //   noteContent: 'Create a Todo App for my portfolio ',
  //   noteTag: '',
  // },
  // {
  //   id: 6,
  //   noteTitle: 'Projects',
  //   noteContent: 'Create a Todo App for my portfolio ',
  //   noteTag: '',
  // },
  // {
  //   id: 7,
  //   noteTitle: 'Calendar',
  //   noteContent: 'Create a Todo App for my portfolio ',
  //   noteTag: '',
  // },
  // {
  //   id: 8,
  //   noteTitle: 'Notes',
  //   noteContent: 'Create a Todo App for my portfolio ',
  //   noteTag: '',
  // }
]
