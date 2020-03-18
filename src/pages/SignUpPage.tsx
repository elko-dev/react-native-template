import React from 'react';
import { Alert, StyleSheet, Text, ScrollView, View } from 'react-native';
import { LoginInput } from "../components/input"
import { LoginButton } from "../components/button"
import { UserStore } from '../stores/UserStore';
import { getUIConstantFromFirebaseError } from '../components/error/auth';
import { RNFirebase } from 'react-native-firebase';
import { styleConstants } from '../config/constants';
import { requiredFieldsEmpty, ValidationObject, ObjectToValidate } from '../utilities/FormValidation';
import { copy } from '../config/static.copy';

interface Props {
    userStore: UserStore;
}

interface State {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}
export class SignUp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        };
    }

    private onPressSignUpButton = (): void => {
        const { email, password, firstName, lastName, phoneNumber } = this.state;
        const validationFields: ObjectToValidate[] = [
            { key: 'First Name', value: firstName },
            { key: 'Last Name', value: lastName },
            { key: 'email', value: email },
            { key: 'password', value: password },
        ];
        const validationErrors: ValidationObject[] = requiredFieldsEmpty(...validationFields);
        if (validationErrors.length !== 0) {
            Alert.alert(validationErrors[0].message); return;
        }

        const displayName: string = `${firstName} ${lastName}`;
        const userStore: UserStore = new UserStore()
        userStore.signUp(email!, password!, displayName, phoneNumber).catch(error => {
            const alertString = getUIConstantFromFirebaseError(error);
            Alert.alert(alertString);
        })
            .then((user: RNFirebase.UserCredential) => {
                Alert.alert('User signed up successfully')
            });
    };

    public render(): JSX.Element {
        const { email, password, firstName, lastName } = this.state;
        const validationFields: ObjectToValidate[] = [
            { key: 'email', value: email },
            { key: 'password', value: password },
            { key: 'First Name', value: firstName },
            { key: 'Last Name', value: lastName },
        ];
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.title}>{copy.signUpUIStrings.SIGN_UP_TITLE}</Text>
                <LoginInput
                    title='First Name*'
                    placeholder={copy.signUpUIStrings.FIRST_NAME_INPUT_PLACEHOLDER}
                    onChangeText={(firstName: string) => {
                        this.setState({ firstName: firstName })
                    }}
                />
                <LoginInput
                    title='Last Name*'
                    placeholder={copy.signUpUIStrings.LAST_NAME_INPUT_PLACEHOLDER}
                    onChangeText={(lastName: string) => {
                        this.setState({ lastName: lastName })
                    }}
                />
                <LoginInput
                    title='Email*'
                    placeholder={copy.signUpUIStrings.EMAIL_INPUT_PLACEHOLDER}
                    onChangeText={(email: string) => {
                        this.setState({ email: email })
                    }}
                    keyboardType="email-address"
                />
                <LoginInput
                    title='Password*'
                    secureTextEntry={true}
                    placeholder={copy.signUpUIStrings.PASSWORD_INPUT_PLACEHOLDER}
                    onChangeText={(password: string) => {
                        this.setState({ password: password })
                    }}
                />
                <LoginInput
                    title='Phone Number'
                    placeholder={copy.signUpUIStrings.PHONE_NUMBER_INPUT_PLACEHOLDER}
                    onChangeText={(phoneNumber: string) => {
                        this.setState({ phoneNumber: phoneNumber })
                    }}
                    keyboardType="phone-pad"
                />
                <LoginButton invalid={requiredFieldsEmpty(...validationFields).length !== 0} onPress={this.onPressSignUpButton}>
                    <Text>{copy.signUpUIStrings.SIGN_UP}</Text>
                </LoginButton>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
        paddingHorizontal: '7.5%',
    },
    title: {
        fontSize: styleConstants.fontSize.XX_LARGE,
        color: styleConstants.colors.TITLE_PRIMARY,
        fontWeight: styleConstants.fontWeight.BOLD,
        width: '100%',
    },
});

