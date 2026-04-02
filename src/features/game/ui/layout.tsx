import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import React from "react";

export function GameLayout({
  status,
  field,
  players,
  leaveButton,
  backButton,
}: {
  players?: React.ReactNode;
  status?: React.ReactNode;
  field?: React.ReactNode;
  leaveButton?: React.ReactNode;
  backButton?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Крестики нолики 3x3</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">{field}</div>
        {(leaveButton || backButton) && (
          <div className="flex justify-between items-center">
            <div>{backButton}</div>
            <div>{leaveButton}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
