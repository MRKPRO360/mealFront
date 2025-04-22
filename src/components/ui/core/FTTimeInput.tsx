'use client';

import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface TimeDurationPickerProps {
  control: Control<any>;
  name: string;
  label?: string;
}

export const TimeDurationPicker = ({
  control,
  name,
  label = 'Total Time',
}: TimeDurationPickerProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const parseTime = (value: string) => {
          const match = value.match(/(\d+)h\s*(\d+)m/);
          return match
            ? { hours: parseInt(match[1]), minutes: parseInt(match[2]) }
            : { hours: 0, minutes: 0 };
        };

        const time = parseTime(field.value);

        const handleChange = (type: 'hours' | 'minutes', newValue: number) => {
          const updated = {
            ...time,
            [type]: newValue,
          };

          const formatWithZero = (num: number) =>
            num.toString().padStart(2, '0');

          field.onChange(
            `${formatWithZero(updated.hours)}h ${formatWithZero(
              updated.minutes
            )}m`
          );
        };
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={12}
                  placeholder="Hours"
                  value={time.hours}
                  onChange={(e) =>
                    handleChange('hours', parseInt(e.target.value || '0'))
                  }
                  className="w-1/2"
                />
              </FormControl>
              <span className="text-sm text-muted-foreground">hr</span>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={59}
                  step={5}
                  placeholder="Minutes"
                  value={time.minutes}
                  onChange={(e) =>
                    handleChange('minutes', parseInt(e.target.value || '0'))
                  }
                  className="w-1/2"
                />
              </FormControl>
              <span className="text-sm text-muted-foreground">min</span>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
