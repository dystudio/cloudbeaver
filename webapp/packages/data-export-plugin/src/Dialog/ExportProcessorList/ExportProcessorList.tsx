/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react';

import { DataTransferProcessorInfo } from '@dbeaver/core/sdk';
import { ItemList } from '@dbeaver/core/src/blocks';

import { ProcessorItem } from './ProcessorItem';

type ExportProcessorListProps = {
  processors: DataTransferProcessorInfo[];
  onSelect(processorId: string): void;
  className?: string;
}

export const ExportProcessorList = observer(function ExportProcessorList({
  processors,
  onSelect,
  className,
}: ExportProcessorListProps) {

  return (
    <ItemList className={className}>
      {processors.map(processor => <ProcessorItem key={processor.id} processor={processor} onSelect={onSelect}/>)}
    </ItemList>
  );
});
