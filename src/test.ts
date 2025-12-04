// This file is required by karma.conf.js and loads a controlled subset of .spec files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Suppress unhandled promise rejections that occur after tests complete
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    try {
      console.error('Unhandled rejection caught globally:', event.reason);
      if (event.reason && event.reason.stack) {
        console.error('Stack:', event.reason.stack);
      } else {
        try { console.error('Reason (stringified):', JSON.stringify(event.reason)); } catch(e) {}
      }
    } catch (e) {
      console.error('Error logging unhandledrejection', e);
    }
    event.preventDefault();
  });
}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
