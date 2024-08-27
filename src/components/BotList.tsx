import { useState } from "preact/hooks";
import type { ResponseData } from "../utils/analyse";
import style from "./BotList.module.css";

export const BotList = ({
  bots,
  icon = "🤖",
}: {
  bots: ResponseData["results"];
  icon?: string;
}) => {
  return (
    <ul class="bot-list" className={style["bot-list"]}>
      {bots.map((bot) => (
        <li>
          <code>
            {icon} {bot.name}
          </code>

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
                <a href={bot.developer.website}>{bot.developer.name} &rarr;</a>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};
