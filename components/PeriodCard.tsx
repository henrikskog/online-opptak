import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { periodType } from "../lib/types/types";
import { formatDateNorwegian } from "../lib/utils/dateUtils";
import Button from "./Button";

interface Props {
  period: periodType;
}

const PeriodCard = ({ period }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (session?.user?.owId) {
        const response = await fetch(
          `/api/applicants/${period._id}/${session.user.owId}`
        );
        if (response.ok) {
          const data = await response.json();
          setHasApplied(data.exists);
        }
      }
    };

    if (period._id && session?.user?.owId) {
      checkApplicationStatus();
    }
  }, [period._id, session?.user?.owId]);

  const handleButtonOnClick = () => {
    router.push(`/application/${period._id}`);
  };

  return (
    <div className="w-full max-w-md mx-auto break-words border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-online-snowWhite">
            {period.name}
          </h3>
          <p className="w-full mt-1 text-gray-500 dark:text-gray-200">
            {period.description}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
            Søknadsperiode:{" "}
            {formatDateNorwegian(period.applicationPeriod.start)} -{" "}
            {formatDateNorwegian(period.applicationPeriod.end)}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
            Intervjuperiode: {formatDateNorwegian(period.interviewPeriod.start)}{" "}
            - {formatDateNorwegian(period.interviewPeriod.end)}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            onClick={hasApplied ? handleButtonOnClick : handleButtonOnClick}
            title={hasApplied ? "Se søknad" : "Søk nå"}
            size="small"
            color="white"
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodCard;
