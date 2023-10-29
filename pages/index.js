import { Fragment } from 'react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    setLoadedMeetups();
  }, [loadedMeetups]);
  return (
    <Fragment>
      <Head>
        <title>NextJS Meetups</title>
        <meta name="description" content="Browse a huge list of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://Kipkemoi:Den11476@cluster0.76eotyf.mongodb.net/nextjs?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  console.log(`meetups: ${meetups}`);
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        description: meetup.data.description,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
