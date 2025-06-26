import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { useFetchData } from "@/hooks";
import { fetchTopics } from "@/api";

import styles from "./Topics.module.scss";

const Topics = () => {
  const { data: topics, isLoading } = useFetchData(fetchTopics);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTopic = searchParams.get("topic");

  function handleTopic(topic: string) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", topic);
    setSearchParams(newParams);
  }

  useEffect(() => {
    if (topics?.length && !selectedTopic) {
      handleTopic(topics[0].slug);
    }
  }, [topics, selectedTopic]);

  return (
    <div className={styles.topics}>
      <div className="container">
        {!isLoading && topics ? (
          <div className={styles.topics_list}>
            {topics.map((topic) => (
              <div
                key={topic.slug}
                className={`${styles.topics_item} ${
                  selectedTopic === topic.slug ? styles.topics_item_active : ""
                }`}
                onClick={() => handleTopic(topic.slug)}
              >
                {topic.slug}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Topics;
