import { Component, Input, OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { CreateAppointmentsComponent } from '../create-appointments/create-appointments.component';
import { FairService } from 'src/app/shared/services/fair.service';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';

@Component({
  selector: 'app-fair-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fair-calendar.component.html',
  styleUrls: ['./fair-calendar.component.css']
})
export class FairCalendarComponent implements OnInit{
  @Input() list_events: CalendarEvent[] = [];
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  activeDayIsOpen: boolean = true;
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined; 
  
  constructor(
    public modalService: NgbModal,
    private customPopUpService: CustomPopUpService,
    private fairService: FairService) {}
  
  ngOnInit(): void {
    this.getAndFormatEvents()
  }

  private getAndFormatEvents(){
    this.fairService.getEvents().subscribe(
      data => {
        if (data.status === 204) {
          this.openCustomPopUp(data.message);
        } else if (data.status === 200){
          console.log(data.data);
          this.list_events = this.formatColors(data.data);
          this.refresh.next();
        }
      }
    )
  }

  formatColors(events: any) {
    for (let event of events) {
      if (event.kindEvents.name === 'Importante') {
        event.color = {
          red: {
            primary: event.kindEvents.primary,
            secondary: event.kindEvents.secondary
          }
        }
      } else if (event.kindEvents.name === 'Noticia') {
        event.color = {
          yellow: {
            primary: event.kindEvents.primary,
            secondary: event.kindEvents.secondary
          }
        }
      } else {
        event.color = {
          blue: {
            primary: event.kindEvents.primary,
            secondary: event.kindEvents.secondary
          }
        }
      }

      delete event.kindEvents

      event.start = new Date(event.start);
      event.end = new Date(event.end);
    }

    return events;
  }

  public openCustomPopUp(message: string): Promise<boolean> {
    return this.customPopUpService.confirm(
      'Calendario de eventos', 
      message,
      undefined
      );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventClicked(event: any) {
    console.log('Clicked')
    console.log(event)
    const modalRef = this.modalService.open(EditEventComponent, { centered: true })
    modalRef.componentInstance.event = event


  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.list_events = this.list_events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  createEvent(): void {
    this.modalService.open(CreateAppointmentsComponent, { centered: true });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}