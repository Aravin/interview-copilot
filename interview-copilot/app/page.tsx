'use client';

import Question from "@/components/question";
import json from '@/app/js.json';
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex p-2 m-2 gap-8 max-h-screen	">
      <section className="flex-2">
        {
          Object.keys(json).map((title: string, index: number) =>
            <div className="collapse collapse-plus bg-base-200 m-1" key={index}>
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">{title}</div>
              <div className="collapse-content">

                {
                  ((json as any)[title]).map((question: string, index: number) =>
                    <Question id={`${title}.${question}`} question={question} key={index} />)
                }

              </div>
            </div>)
        }
      </section>

      <section className="flex-auto">
        <div>
          <div className="font-medium">Result</div>

          <div className="bg-base-200 p-2 m-2 text-xs">
            <p>JavaScript:-</p>
            <p>------------</p>
            <br />
            <div>
              <hr />
              <p>Has advanced knowledge in</p>
              <ul>
                <li>  - Arrow</li>
                <li>  - Closure</li>
              </ul>
              <br />
              <p>Has intermediate knowledge in</p>
              <ul>
                <li>  - Generics</li>
                <li>  - OOPS</li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
