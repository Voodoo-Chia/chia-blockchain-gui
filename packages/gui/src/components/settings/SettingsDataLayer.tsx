import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import { Flex, SettingsLabel } from '@chia/core';
import {
  FormGroup,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@mui/material';

export default function SettingsDataLayer() {
  const [hideObjectionableContent, setHideObjectionableContent] =
    useState(false);

  return (
    <Grid container>
      <Grid item xs={12} sm={6} lg={3}>
        <Flex flexDirection="column" gap={1}>
          <SettingsLabel>
            <Trans>Gallery Management</Trans>
          </SettingsLabel>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={hideObjectionableContent}
                  onChange={() =>
                    setHideObjectionableContent(!hideObjectionableContent)
                  }
                />
              }
              label={<Trans>Hide objectionable content</Trans>}
            />
          </FormGroup>
        </Flex>
      </Grid>
    </Grid>
  );
}
