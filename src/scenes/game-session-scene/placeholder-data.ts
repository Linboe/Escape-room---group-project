// This is a placeholder TS file to check that things are wired up.
import placeholderImage from '../../assets/placeholder-image.jpg';

// TODO: Discuss with team where room data should live (consider turning this to a JSON to live inside the data directory)
export const constantRoomData = {
    roomTitleText: 'Abandoned Train-station',
    backgroundImage: placeholderImage,
    backgroundImageScreenReader: 'Image of an overgrown train station',
};

// TODO: Discuss with team where script data should live (consider turning this to a JSON to live inside the data directory)
export const scriptData = [
    {
        textEvent: 'You enter what seem to have been a train station... What will you do?',
        eventMarker: 'enter-train-station',
        buttonEvents: [
            {
                label: 'Action A (next script)',
                buttonMarker: 'action-a'
            },
            {
                label: 'Action B',
                buttonMarker: 'action-b'
            }
        ]
    },
    {
        textEvent: "The train doesn't seem to be comming", // eslint-disable-line
        eventMarker: 'train-not-comming',
        buttonEvents: [
            {
                label: 'Action A',
                buttonMarker: 'action-a'
            },
            {
                label: 'Action B',
                buttonMarker: 'action-b'
            },
            {
                label: 'Action C (next script)',
                buttonMarker: 'action-c'
            },
            {
                label: 'action D',
                buttonMarker: 'action-d'
            },
        ]
    },
    {
        textEvent: "This action has no buttons", // eslint-disable-line
        eventMarker: '',
        buttonEvents: []
    },
    {
        textEvent: "It's a dead end", // eslint-disable-line
        eventMarker: 'dead-end',
        buttonEvents: [
            {
                label: 'Give up',
                buttonMarker: 'give-up'
            }
        ]
    },
];