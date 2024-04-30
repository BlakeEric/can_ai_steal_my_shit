import { useState } from "preact/hooks";
import type { ResponseData } from "../utils/analyse";
import style from "./BotList.module.css";
import React from "preact/compat";

export const BotList = ({
  bots,
  icon = "🤖",
}: {
  bots: ResponseData["results"];
  icon?: string;
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<null | number>(null);

  const toggleItem = (index: number) => {
    if (index === activeItemIndex) {
      setActiveItemIndex(null);
      return;
    }
    setActiveItemIndex(index);
  };

  return (
    <ul class="bot-list" className={style["bot-list"]}>
      {bots.map((bot, i) => (
        <li>
          <a
            href={`/bots#${bot.name.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              toggleItem(i);
            }}
          >
            <code>
              {icon} {bot.name}
            </code>
          </a>
          {activeItemIndex === i && (
            <div className={style.popover}>
              <strong>
                <code>{bot.name}</code>
              </strong>
              <ul>
                <li>
                  <em>{bot.description}</em>
                </li>
                <li>
                  Developer:{" "}
                  <a href={bot.developer.website}>
                    {bot.developer.name} &rarr;
                  </a>
                </li>
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
