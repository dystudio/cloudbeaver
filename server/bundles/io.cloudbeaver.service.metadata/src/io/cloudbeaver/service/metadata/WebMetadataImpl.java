/*
 * DBeaver - Universal Database Manager
 * Copyright (C) 2010-2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.cloudbeaver.service.metadata;

import io.cloudbeaver.DBWebException;
import io.cloudbeaver.server.model.WebNavigatorNodeInfo;
import io.cloudbeaver.server.model.session.WebSession;
import org.jkiss.dbeaver.DBException;
import org.jkiss.dbeaver.model.DBPScriptObject;
import org.jkiss.dbeaver.model.navigator.DBNDatabaseNode;
import org.jkiss.dbeaver.model.navigator.DBNNode;
import org.jkiss.dbeaver.model.struct.DBSObject;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Web service implementation
 */
public class WebMetadataImpl implements WebMetadataAPI {


    @Override
    public String getNodeDDL(WebSession webSession, WebNavigatorNodeInfo node, Map<String, Object> options) throws DBWebException {
        DBNNode dbNode = node.getNode();
        if (dbNode instanceof DBNDatabaseNode) {
            DBSObject object = ((DBNDatabaseNode) dbNode).getObject();
            if (object instanceof DBPScriptObject) {
                if (options == null) {
                    options = new LinkedHashMap<>();
                }
                try {
                    return ((DBPScriptObject) object).getObjectDefinitionText(webSession.getProgressMonitor(), options);
                } catch (DBException e) {
                    throw new DBWebException("Error extracting DDL", e);
                }
            } else {
                throw new DBWebException("Object '" + node.getId() + "' doesn't support DDL");
            }
        } else {
            throw new DBWebException("Node '" + node.getId() + "' is not database node");
        }
    }
}
