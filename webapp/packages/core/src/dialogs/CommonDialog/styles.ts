/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { css } from 'reshadow';

export const dialogStyles = css`
    DialogBackdrop {
      box-sizing: border-box;
      background-color: rgba(0,0,0,0.48);
      position: fixed;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      z-index: 999;
    }

    Dialog {
      box-sizing: border-box;
      display: flex;
      position: fixed;
      top: 50%;
      left: 50%;
      max-height: calc(100vh);
      transform: translate(-50%, -50%);
      z-index: 999;
    }
  `;
