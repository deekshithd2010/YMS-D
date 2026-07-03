import React from "react";
import PropTypes from "prop-types";
import YCapplication from "../../components/YCapplication";

function DYEd(props) {
  return (
    <>
      <YCapplication
        course="DIPLOMA IN YOGA EDUCATION [ D.YEd ]"
        overview1="The Diploma in Yoga Education [D.YEd] is aimed at producing qualified, trained and holistic yoga teaching professionals. Yoga deals with the physical, mental, emotional, intellectual and spiritual wellbeing of an individual. Yoga is an invaluable gift from our ancient tradition. Yoga embodies unity of mind and body, thought and action. A holistic approach that is valuable to our health and our well-being. Yoga is not just about exercise, it is a way to discover the sense of oneness with yourself, the world and nature."
        overview2="The main objective of Diploma in Yoga Education [D.YEd] is to enable the student to teach yoga to the general public even with the physical ailments. The course involves both theoretical, practical and practice of teaching aspects of yogic science. The D.YEd course covers the theoretical subjects such as philosophy, history and development of yogic science. Course incorporates the study and practice of asanas, pranayama, meditation, mudras, bandhas and kriyas. Course involves Advanced practical training in yoga and organization and teaching skills of yogic activities. Course also covers study of lifestyle changes and dietary practices to enhance the healing process."
        eligibility="PUC or Equivalent or SSLC with Yoga Experience."
        duration="The Diploma in Yoga Education course is for ONE YEAR"
        outcome={
          <ui>
            1.Teach and train the individuals to prevent the disorder and
            maintain fitness. 2.Organization and teaching skills of yogic
            activities. 3.Understand philosophy, history and development of
            yogic science. 4.Cognize theoretical and practical aspects of
            asanas, pranayama, meditation, mudra, bandha and kriyas 5.To bring
            all round personality development of the students at all levels of
            their personality. 6.Revive and promote the ancient Gurukula System
            of yoga education.
          </ui>
        }
        link="/DYEd"
      />
    </>
  );
}

DYEd.propTypes = {};

export default DYEd;
