import { Component, OnInit } from '@angular/core';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { CityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';

@Component({
    selector: 'app-add-city',
    templateUrl: './add-city.component.html',
    styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {

    public city = new CityModel(); // Must create an object for the two-way binding

    constructor(private cityService: CityService, private router: Router, private notify: NotifyService) { }


    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public async add() {
        try {
            await this.cityService.addCityAsync(this.city);
            IncompleteGuard.canLeave = true;
            this.notify.success("City added");
            // this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

}
