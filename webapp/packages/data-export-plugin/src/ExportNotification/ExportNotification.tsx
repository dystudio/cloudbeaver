/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import styled, { use, css } from 'reshadow';

import { SNACKBAR_STYLES } from '@dbeaver/core/app';
import { Button, Loader, IconButton } from '@dbeaver/core/blocks';
import { useController } from '@dbeaver/core/di';
import { NotificationComponentProps } from '@dbeaver/core/eventsLog';
import { useTranslate } from '@dbeaver/core/localization';
import { useStyles } from '@dbeaver/core/theming';
import { EDeferredState } from '@dbeaver/core/utils';

import { ExportNotificationController } from './ExportNotificationController';

const styles = css`
  Loader {
    margin-right: 16px;
  }
  source-name {
    composes: theme-typography--body2 from global;
    padding-top: 16px;
    max-height: 50px;
    overflow: hidden;

    & pre {
      margin: 0;
    }
  }
`;

export const ExportNotification = observer(function ExportNotification({
  notification,
}: NotificationComponentProps<string>) {
  const controller = useController(ExportNotificationController, notification);
  const translate = useTranslate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return styled(useStyles(SNACKBAR_STYLES, styles))(
    <notification as="div" {...use({ mounted })} >
      <notification-header as="div">
        <Loader loading={controller.isPending} hideMessage />
        <message as="div">{translate(controller.status)}</message>
        {!controller.isPending && (
          <IconButton onClick={controller.delete} name="cross" viewBox="0 0 16 16" />
        )}
      </notification-header>
      <notification-body as="div">
        <source-name as="div">
          {controller.sourceName}
          <pre>{controller.task?.context.sourceName}</pre>
        </source-name>
        <actions as="div">
          {controller.isSuccess && (
            <>
              <Button
                type="button"
                mod={['outlined']}
                onClick={controller.delete}
              >
                {translate('data_transfer_notification_delete')}
              </Button>
              <Button
                type="button"
                tag='a'
                href={controller.downloadUrl}
                mod={['unelevated']}
                onClick={controller.download}
                download
              >
                {translate('data_transfer_notification_download')}
              </Button>
            </>
          )}
          {controller.hasDetails && (
            <Button
              type="button"
              mod={['outlined']}
              onClick={controller.showDetails}
              disabled={controller.isDetailsDialogOpen}
            >
              {translate('ui_errors_details')}
            </Button>
          )}
          {controller.isPending && (
            <Button
              type="button"
              mod={['outlined']}
              onClick={controller.cancel}
              disabled={controller.process?.getState() === EDeferredState.CANCELLING}
            >
              {translate('ui_processing_cancel')}
            </Button>
          )}
        </actions>
      </notification-body>
    </notification>
  );
});
