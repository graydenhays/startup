import React, { useState, useEffect } from 'react';
import { SubscriberEvent, SubNotifier } from './subscriberNotifier';
import './info.css';

export function Info() {
  const [subNumber, setSubNumber] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [displayError, setDisplayError] = useState('');

  const handleSubscriptionToggle = async () => {
    try {
      const endpoint = isSubscribed ? '/api/removeSubscriber' : '/api/newSubscriber';
      const response = await fetch(endpoint, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`Error ${isSubscribed ? 'unsubscribing' : 'subscribing'}: ${response.status}`);
      }
      const result = await response.json();
      if (result) {
        setDisplayError('');
        alert(`You have been ${isSubscribed ? 'unsubscribed' : 'subscribed'} successfully`);
        setIsSubscribed(!isSubscribed);
        setSubNumber(prevNumber => isSubscribed ? prevNumber - 1 : prevNumber + 1);
        if (isSubscribed) {
          SubNotifier.notifyUnsubscribe();
        } else {
          SubNotifier.notifySubscribe();
        }
      } else {
        setDisplayError(`⚠ ${isSubscribed ? 'Unsubscribe' : 'Subscribe'} failed. Please try again.`);
      }
    } catch (error) {
      console.error(`Error while ${isSubscribed ? 'unsubscribing' : 'subscribing'}:`, error);
      setDisplayError(`⚠ An error occurred while ${isSubscribed ? 'unsubscribing' : 'subscribing'}: ${error.message}`);
    }
  };

  useEffect(() => {
    const handleSubscriberUpdate = (event) => {
      if (event.type === SubscriberEvent.CountUpdate) {
        setSubNumber(event.value.count);
      }
    };

    SubNotifier.addHandler(handleSubscriberUpdate);

    SubNotifier.getSubscriberCount();

    fetch('/api/subscribers')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error getting subscribers: ${response.status}`);
        }
        return response.json();
      })
      .then((subscribers) => {
        console.log(subscribers.count);
        setSubNumber(subscribers.count);
      })
      .catch((error) => {
        console.error('Error fetching subscribers:', error);
        setDisplayError(`⚠ Error fetching subscribers: ${error.message}`);
      });

    return () => {
      SubNotifier.removeHandler(handleSubscriberUpdate);
    };
  }, []);


  return (
    <section>
      <div className="p-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra, libero non sollicitudin bibendum, dui ligula ullamcorper nulla, ut volutpat ex nulla ut mauris. Fusce venenatis et nisl quis rutrum. Duis finibus dignissim ex, quis mattis nisl ultrices eu. In et mollis est, et condimentum dolor. Integer faucibus accumsan ipsum, et mattis urna egestas id. Phasellus sed ullamcorper orci. Sed venenatis risus quis nunc aliquam vehicula. Curabitur a aliquet arcu. Nullam nec tempor turpis. Cras ut euismod quam. Nullam a nulla quis sem pulvinar lobortis in in mi.
        <br/><br/>
        Phasellus malesuada ligula magna, vitae hendrerit eros feugiat pulvinar. Nunc laoreet nibh eu felis interdum porttitor. Etiam ut ex ac eros faucibus venenatis sed vitae nisi. Vestibulum vitae rhoncus leo. Sed risus nisl, volutpat at turpis quis, facilisis lobortis magna. Nunc non lacinia tellus. Nam pretium nulla erat, in consectetur massa imperdiet id. Integer ac viverra nulla, non feugiat odio. Curabitur vel dui sed leo mollis vehicula a at sapien. Aliquam rutrum arcu id velit tincidunt, ultrices interdum mauris dignissim. Vivamus bibendum dignissim ipsum nec pretium. Suspendisse potenti.
      </div>

      <div className="p-5">{subNumber} people are already signed up!</div>

      <div className="widget p-5">Interactive widget celebrating your sub</div>

      <div style={{ flexGrow: 1, display: 'flex' }}>
        <div style={{ alignSelf: 'end' }}>
          Would you like to {isSubscribed ? 'unsubscribe' : 'subscribe'}?
          <button onClick={handleSubscriptionToggle}>
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
        </div>
      </div>

      {displayError && <div className="error">{displayError}</div>}
    </section>
  );
}
