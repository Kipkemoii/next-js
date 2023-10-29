import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '@/components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      description={props.meetupData.description}
      title={props.meetupData.title}
      address={props.meetupData.address}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://Kipkemoi:Den11476@cluster0.76eotyf.mongodb.net/nextjs?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    'mongodb+srv://Kipkemoi:Den11476@cluster0.76eotyf.mongodb.net/nextjs?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        image: selectedMeetup.data.image,
        address: selectedMeetup.data.address,
        description: selectedMeetup.data.description,
      },
    },
  };
}

export default MeetupDetails;
