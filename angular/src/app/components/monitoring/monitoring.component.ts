import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { interval, takeWhile } from 'rxjs';
import { ActuatorService } from 'src/app/services/actuator.service';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  stop=false;
  serverStatus:string = "OFF";
  serverStatusSeverity : string = "danger";
  databaseStatus:string;
  pingStatus:string;
  diskSpaceStatus:string;
  diskSpaceTotalGB:string;
  diskSpaceFree:string;
  diskSpaceTotal:any;

  info:any;
  metrics:any;
  fullMetric:any;
  profile:string;

  cpuCount:any;
  cpuUsage:any;
  memoryMax:any;
  memoryUsage:any;

  loading=true;


  loadingActuatorInfo=true;
  loadingActuatorEnv=true;
  loadingActuatorMetrics=true;
  loadingActuatorCpuCount=true;
  loadingActuatorMemoryMax=true;

  constructor(private actuatorService: ActuatorService) { }

  ngOnInit(): void {

    this.actuatorService.health().subscribe({
      next: (res: any) => {
        //console.log(res);
        this.setActuatorVariables(res);
        this.startInterval();
        this.setActuatorInfo();
        this.setActuatorEnv();
        this.setActuatorMetrics();
        this.setActuatorCpuCount();
        this.setActuatorMemoryMax();
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });



  }

  startInterval(){
    interval(2000)//ogni 1 secondi
    .pipe(takeWhile(() => !this.stop))
    .subscribe(() => {
      this.setActuatorIntervalVariable();
      this.setTotalLoading();
    });
  }

  setActuatorVariables(res:any){
    this.serverStatus=res.status;
    if(this.serverStatus=="UP"){
      this.serverStatusSeverity="success";
    }
    else{
      this.serverStatusSeverity="danger";
    }
    this.databaseStatus=res.components.db.details.database+": "+res.components.db.status;
    this.pingStatus=res.components.ping.status;
    this.diskSpaceStatus=res.components.diskSpace.status;
    this.diskSpaceTotal=(res.components.diskSpace.details.total/1000000000).toFixed(2);
    this.diskSpaceTotalGB= this.diskSpaceTotal+" GB";
    var free=(res.components.diskSpace.details.free/1000000000).toFixed(2);
    this.diskSpaceFree=free;
  }

  setActuatorCpuCount(){
    this.actuatorService.getByName("metrics/system.cpu.count").subscribe({
      next: (res: any) => {
        //console.log(res);
        this.cpuCount=(res.measurements[0].value);
        this.loadingActuatorCpuCount=false;
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
  }

  setActuatorMetrics(){
    this.actuatorService.metrics().subscribe({
      next: (res: any) => {
        console.log(res.names.length);
        this.metrics=res.names;
        this.loadingActuatorMetrics=false;
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
  }

  setActuatorInfo(){
    this.actuatorService.info().subscribe({
      next: (res: any) => {
        //console.log(res);
        this.info=res;
        this.loadingActuatorInfo=false;
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
  }

  setActuatorEnv(){
    this.actuatorService.env().subscribe({
      next: (res: any) => {
        //console.log(res);
        this.profile=res.activeProfiles;
        this.loadingActuatorEnv=false;
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
  }

  setActuatorMemoryMax(){
    this.actuatorService.getByName("metrics/jvm.memory.max").subscribe({
      next: (res: any) => {
        this.memoryMax=(res.measurements[0].value/1000000000).toFixed(2);
        this.loadingActuatorMemoryMax=false;
        //console.log(res);
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
  }
  setActuatorIntervalVariable(){
    this.actuatorService.getByName("metrics/system.cpu.usage").subscribe({
      next: (res: any) => {
        //console.log(res);
        this.cpuUsage=res.measurements[0].value.toFixed(2);
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
    this.actuatorService.getByName("metrics/jvm.memory.used").subscribe({
      next: (res: any) => {
        //console.log(res);
        this.memoryUsage=(res.measurements[0].value/1000000000).toFixed(2);
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
  }

  openMetric(prop){
    //console.log(prop);
    this.actuatorService.getByName("metrics/"+prop).subscribe({
      next: (res: any) => {
        this.fullMetric=res;
      },
      complete: () => { },
      error: (e) => { console.log(e); }
    });
  }

  setTotalLoading(){
    this.loading=this.loadingActuatorCpuCount || this.loadingActuatorEnv 
                                              || this.loadingActuatorInfo
                                              || this.loadingActuatorMemoryMax
                                              || this.loadingActuatorMetrics;
  }

}
