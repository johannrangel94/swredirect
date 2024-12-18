import * as React from 'react';
//import styles from './SwRedirect.module.scss';
import { ISwRedirectProps } from './ISwRedirectProps';
//import { escape } from '@microsoft/sp-lodash-subset';

export default class SwRedirect extends React.Component<ISwRedirectProps, {}> {


  componentDidUpdate(
    prevProps: Readonly<ISwRedirectProps>,
    prevState: Readonly<{}>,
    prevContext: any
  ): void {
    if (this.props.title !== prevProps.title) {
      console.log("Cambio el titulo");

    }
    if (this.props.link !== prevProps.link) {
      console.log("Cambio el link");

    }
    if (this.props.time !== prevProps.time) {
      console.log("Cambio el time");

    }

    if (this.props.activate !== prevProps.activate) {
      console.log("Cambio el activate");

    }
  }




  public render(): React.ReactElement<ISwRedirectProps> {

    const { title, link, time, activate } = this.props;

    const isValidURL = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        console.log("La url no es valida");
        return false;
      }
    };


    if (link !== null && activate === true && isValidURL(link)) {
      window.setTimeout(function () {
        // Move to a new location or you can do something else
        window.location.href = link;
      }, time);
    }

    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
}
