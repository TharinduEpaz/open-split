export default class simplyfyDebts {
    private people: string[] = [];
    private debts: [string, string, number][] = [];
    private balances:number[] = [];
    private transactions: [string, string, number][] = [];

    public computeBalances(): number[]{
        this.balances = Array.from({length: this.people.length}, () => 0);
        for (const [debtor, creditor, value] of this.debts) {
            this.balances[this.people.indexOf(debtor)] -= value;
            this.balances[this.people.indexOf(creditor)] += value;
        }
        return this.balances;
    }

    // Helper function to generate combinations
    private combinations<T>(arr: T[], size: number): T[][] {
        if (size === 0) return [[]];
        if (arr.length === 0) return [];
        
        const [first, ...rest] = arr;
        const withFirst = this.combinations(rest, size - 1).map(combo => [first, ...combo]);
        const withoutFirst = this.combinations(rest, size);
        
        return [...withFirst, ...withoutFirst];
    }

    // Find a subset of people whose balances sum to zero
    private findZeroSumSubsets(balances: number[], remainingPeople: string[]): string[] | null {
        // Convert balances array to [person, balance] pairs
        // Use this.people.indexOf(person) to get the correct balance index
        const balancePairs: [string, number][] = remainingPeople.map((person) => {
            const index = this.people.indexOf(person);
            return [person, balances[index]];
        });
        
        // Try subsets of increasing size (starting from 1)
        for (let i = 1; i <= balancePairs.length; i++) {
            const subsets = this.combinations(balancePairs, i);
            
            for (const subset of subsets) {
                // Calculate sum of balances in this subset
                const sum = subset.reduce((acc, [, balance]) => acc + balance, 0);
                
                // If sum is zero, return the people (keys) in this subset
                if (sum === 0) {
                    return subset.map(([person]) => person);
                }
            }
        }
        return null;
    }

// Simplify debts using collector pattern (first person collects all)
private simplifyWithCollector(subsetBalances: Map<string, number>): [string, string, number][] {
    const collector = Array.from(subsetBalances.keys())[0];
    const transactions: [string, string, number][] = [];
    
    for (const [person, balance] of subsetBalances.entries()) {
        if (person !== collector) {
            transactions.push([collector, person, balance]);
        }
    }
    
    return transactions;
}

public simplifyDebts(){
    let balances = this.computeBalances();
    let remainingSet = [...this.people];
    let subsets: string[][] = [];
    let subset = this.findZeroSumSubsets(balances, remainingSet);

    // Store original balances before modifying
    const originalBalances = [...balances];
    const optimalTransactions: [string, string, number][] = [];

    while (subset !== null && subset !== undefined) {
        subsets.push(subset);
        
        // Get subset balances from original balances
        const subsetBalances = new Map<string, number>();
        for (const person of subset) {
            const index = this.people.indexOf(person);
            subsetBalances.set(person, originalBalances[index]);
        }
        
        // Calculate transactions for this subset using collector pattern
        const subsetTransactions = this.simplifyWithCollector(subsetBalances);
        optimalTransactions.push(...subsetTransactions);
        
        // Set balances of people in the subset to 0 (they've settled among themselves)
        for (const person of subset) {
            const index = this.people.indexOf(person);
            balances[index] = 0;
        }
        
        // Remove them from remaining set
        remainingSet = remainingSet.filter((person: string) => !subset?.includes(person));
        subset = this.findZeroSumSubsets(balances, remainingSet);
    }
    this.transactions = optimalTransactions;
}
    public getBalances(){
        return this.balances;
    }

    public getTransactions(){
        return this.transactions;
    }

    public setPeople(people: string[]){
        this.people = people;
    }

    public setDebts(debts: [string, string, number][]){
        this.debts = debts;
    }
}