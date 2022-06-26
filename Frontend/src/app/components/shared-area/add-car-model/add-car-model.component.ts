import { Component, OnInit } from '@angular/core';
import { CarModelModel } from 'src/app/models/car-model.model';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { CarModelService } from 'src/app/services/car-model.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-add-car-model',
    templateUrl: './add-car-model.component.html',
    styleUrls: ['./add-car-model.component.css']
})
export class AddCarModelComponent {

    public carModel = new CarModelModel(); // Must create an object for the two-way binding

    constructor(private carModelService: CarModelService, private router: Router, private notify: NotifyService) { }

    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public async add() {
        try {
            await this.carModelService.addCarModelAsync(this.carModel);
            IncompleteGuard.canLeave = true;
            this.notify.success("Car Model added");
            // this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }
}
