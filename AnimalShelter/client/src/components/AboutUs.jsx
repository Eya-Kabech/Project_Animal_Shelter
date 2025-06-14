import React from 'react'
import styles from "./aboutUs.module.css"

const AboutUs = () => {
  return (
    <div className={styles.container}>
      
    {/* Section 1 - Introduction */}
    <section className={styles.introduction}>
      <div className={styles.text}>
        <h1>Welcome to Pet&Claws</h1>
        <p>We are a passionate community dedicated to rescuing and caring for abandoned animals. Our shelter provides safety, love, and a second chance to every animal.</p>
      </div>
      <div className={styles.image}>
        <img src="/pawHand.jpeg" alt="Shelter Introduction" />
      </div>
    </section>

    {/* Section 2 - Why We Started */}
    <section className={styles.story}>
      <div className={styles.image}>
        <img src="/strayCat.jpeg" alt="Why We Started" />
      </div>
      <div className={styles.text}>
        <h2>Why We Started</h2>
        <p>Our journey began when we saw the growing number of abandoned pets in our community. We couldn’t stand by and watch, so we created a shelter to offer them a better life.</p>
      </div>
    </section>

    {/* Section 3 - What We Do */}
    <section className={styles.mission}>
      <div className={styles.text}>
        <h2>What We Do</h2>
        <p>Our mission is simple: Rescue, nurture, and find homes for every animal that walks through our doors. From medical care to emotional healing, we do everything it takes to ensure a bright future for them.</p>
      </div>
      <div className={styles.image}>
        <img src="/animalCare.jpeg" alt="What We Do" />
      </div>
    </section>

    {/* Section 4 - Our Achievements */}
    <section className={styles.achievements}>
      <h2>Our Achievements</h2>
      <div className={styles.achievementItems}>
        <div className={styles.achievementCard}>
          <h3>500+ Pets Rescued</h3>
          <p>We’ve rescued over 500 animals and found loving homes for them.</p>
        </div>
        <div className={styles.achievementCard}>
          <h3>Community Outreach</h3>
          <p>We’ve organized multiple awareness campaigns and community events to raise adoption awareness.</p>
        </div>
        <div className={styles.achievementCard}>
          <h3>Veterinary Partnerships</h3>
          <p>Through partnerships with local veterinarians, we provide health checkups and treatments for all animals.</p>
        </div>
      </div>
    </section>

    {/* Section 5 - Meet the Team */}
    <section className={styles.team}>
      <h2>Meet Our Team</h2>
      <div className={styles.teamMembers}>
        <div className={styles.member}>
          <img src="/buisnessDog.jpeg" alt="Team Member 1" />
          <h3>John Doe</h3>
          <p>Founder & CEO</p>
        </div>
        <div className={styles.member}>
          <img src="/catDoctor.jpeg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>Veterinarian</p>
        </div>
        <div className={styles.member}>
          <img src="nerdDog.jpeg" alt="Team Member 3" />
          <h3>Mark Johnson</h3>
          <p>Adoption Coordinator</p>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className={styles.callToAction}>
      <h2>Join Us in Making a Difference</h2>
      <p>Help us continue our mission to rescue, rehabilitate, and rehome pets in need. report, or adopt today!</p>
      <p>Your adoption or report make a Difference</p>
    </section>
  </div>
);
}
export default AboutUs