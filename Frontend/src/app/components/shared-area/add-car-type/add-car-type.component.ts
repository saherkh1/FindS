import { CarModelService } from 'src/app/services/car-model.service';
import { Component, OnInit } from '@angular/core';
import { CarTypeModel } from 'src/app/models/car-type.model';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { CarTypeService } from 'src/app/services/car-type.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { CarModelModel } from 'src/app/models/car-model.model';

@Component({
    selector: 'app-add-car-type',
    templateUrl: './add-car-type.component.html',
    styleUrls: ['./add-car-type.component.css']
})

export class AddCarTypeComponent implements OnInit {

    public carType = new CarTypeModel(); // Must create an object for the two-way binding
    public carModels: CarModelModel[];

    constructor(private carModelService: CarModelService,
        private carTypeService: CarTypeService,
        private router: Router,
        private notify: NotifyService) { }


    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public async add() {
        try {
            await this.carTypeService.addCarTypeAsync(this.carType);
            IncompleteGuard.canLeave = true;
            this.notify.success("Car Type added");
            // this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    async ngOnInit() {
        this.carModels = await this.carModelService.getAllCarModelsAsync();
    }
}
