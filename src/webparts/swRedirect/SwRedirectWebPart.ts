import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SwRedirectWebPartStrings';
import SwRedirect from './components/SwRedirect';
import { ISwRedirectProps } from './components/ISwRedirectProps';

export interface ISwRedirectWebPartProps {
  title: string;
  link: string | null;
  time: number;
  activate: boolean;
}

export default class SwRedirectWebPart extends BaseClientSideWebPart<ISwRedirectWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISwRedirectProps > = React.createElement(
      SwRedirect,
      {
        title: this.properties.title || "Redirigiendo",
        link: this.properties.link || null,
        time: this.properties.time || 5000,
        activate: this.properties.activate || false
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Set title'
                }),
                PropertyPaneTextField('link', {
                  label: 'Redirect link'
                }),
                PropertyPaneTextField('time', {
                  label: 'Set time in miliseconds'
                }),
                PropertyPaneCheckbox('activate', {
                  text: 'Activate'
                })
              ]
            }
          ]
        }
      ]
    };
  }


  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'title' && newValue !== oldValue) {
      this.properties.title = newValue;
      this.render();
    }
    if (propertyPath === 'link' && newValue !== oldValue) {

      this.properties.link = newValue;
      this.render();
    }
    if (propertyPath === 'time' && newValue !== oldValue) {

      this.properties.time = newValue;
      this.render();
    }

    if (propertyPath === 'activate' && newValue !== oldValue) {

      this.properties.activate = newValue;
      this.render();
    }
  }

}
