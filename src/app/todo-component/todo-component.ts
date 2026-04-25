import { Component } from '@angular/core';
import { PlanType } from '../../model/app.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-component',
  standalone: false,
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css',
})
export class TodoComponent {
  public isShown: boolean = false;
  public isEdit: boolean = true;
  public editId: number | null = null;
  public goal: string = '';
  public budget: number = 0;
  public category: string = '';
  public deadline: string = '';
  public planData = localStorage.getItem('plan-data');
  public plans: PlanType[] = this.planData ? JSON.parse(this.planData) : [];

  constructor(private snackBar: MatSnackBar) {}

  public togglePlannerForm() {
    this.isShown = !this.isShown;
  }
  public submitPlan() {
    if (!this.isEdit) {
      const existingPlan = this.plans.find((p) => p.goal == this.goal);
      if (existingPlan) {
        this.snackBar.open('This Goal you already created', 'Close', {
          duration: 3000,
        });
        return;
      }
      const plan = {
        id: this.plans.length + 1,
        goal: this.goal,
        budget: this.budget,
        category: this.category,
        deadline: this.deadline,
      };
      this.plans.push(plan);
      this.snackBar.open('Plan Created Successfully', 'Close', {
        duration: 3000,
      });
    } else {
      const plan = this.plans.find((p) => p.id == this.editId);
      if (plan) {
        plan.goal = this.goal;
        plan.budget = this.budget;
        plan.category = this.category;
        plan.deadline = this.deadline;
      }
      this.snackBar.open('Plan Edited Successfully', 'Close', {
        duration: 3000,
      });
      this.isEdit = false;
      this.editId = null;
    }

    localStorage.setItem('plan-data', JSON.stringify(this.plans));
    this.goal = '';
    this.budget = 0;
    this.category = '';
    this.deadline = '';
    this.isShown = false;
  }
  public editPlan(id: number) {
    let plan = this.plans.find((p) => p.id == id);
    if (!plan) {
      this.snackBar.open('Plan not found', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.isShown = true;
    this.goal = plan.goal;
    this.budget = plan.budget;
    this.category = plan.category;
    this.deadline = plan.deadline;
    this.editId = id;
    this.isEdit = true;
  }
  public deletePlan(id: number) {
    this.plans = this.plans.filter((p) => p.id != id);
    localStorage.setItem('plan-data', JSON.stringify(this.plans));
    this.snackBar.open('Plan deleted successfully', 'Close', {
      duration: 3000,
    });
  }
}
