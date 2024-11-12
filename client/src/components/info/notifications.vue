<template>
	<v-menu
		offset-y
	>
		<template
			v-slot:activator = "{ on, attrs }"
		>	
			<v-btn
				text
				v-on = "on"
				v-bind = "attrs"
			>
				<v-icon>
					mdi-email
				</v-icon>
			</v-btn>
		</template>
		<v-list
			dense
			max-heigth = "500"
		>
			<template v-show = "render_notificactions && render_notificactions.length === 0">
				<v-list-item>
					<v-list-content>
						{{ $t("you_dont_have_messages") }}
					</v-list-content>
				</v-list-item>
			</template>
			<template v-for = "(item_notification, idx_notification) of render_notificactions">
				<v-list-item>
					<v-list-content>
						
					</v-list-content>
				</v-list-item>
			</template>
		</v-list>
	</v-menu>
</template>
<script type="text/javascript" src="./js/notifications.js"></script>