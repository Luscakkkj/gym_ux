import { errors } from '@vinejs/vine'
import { ErrorReporterContract, FieldContext } from '@vinejs/vine/build/src/types'

export class SimpleErrorReporter implements ErrorReporterContract {
	hasErrors: boolean = false
	errors: string[] = []

	report(message: string, rule: string, field: FieldContext, meta?: any) {
		this.hasErrors = true
		this.errors.push(message)
	}

	createError() {
		return new errors.E_VALIDATION_ERROR(this.errors)
	}
}
